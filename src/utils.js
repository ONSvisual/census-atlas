import { feature } from 'topojson-client';
import { csvParse, autoType } from 'd3-dsv';

const baseURL = "https://5laefo1cxd.execute-api.eu-central-1.amazonaws.com/dev/hello/skinny"

export async function getData(url) {
  let response = await fetch(url);
  let string = await response.text();
	let data = await csvParse(string, autoType);
  return data;
}

export async function getTopo(url, layer) {
  let response = await fetch(url);
  let topojson = await response.json();
	let geojson = await feature(topojson, layer);
  return geojson;
}

// make sure something calls this on init
export async function getAllEWCategoryData() {
    const url = `${baseURL}?rows=K04000001`;
    let response = await fetch(url);
    let string = await response.text();
	let EWdata = {};
    csvParse(string, (row, i, dBColumns) => {
		dBColumns.forEach((dBColumn) => {
			if (dBColumn != "geography_code") {
				const categoryID = dBColumnToCategoryID(dBColumn);
				EWdata[categoryID] = +row[dBColumn];
			}
      });     
    });
	return EWdata
  }

function decomposeNomisCategory(categoryId) {
	const digitsSuffix = categoryId.match(/\d+$/)[0];
	return {
		digitsSuffix: digitsSuffix, 
		prefix: categoryId.substring(categoryId.lastIndexOf(digitsSuffix), 0)
	}
}

// adjust for 1-based (nomis bulk, in the db) vs 0-based (nomis API, in this app) categories: QS101EW001 -> QS101EW0002
function categoryIDToDBColumn(categoryId) {
	const categoryIdParts = decomposeNomisCategory(categoryId);
	const adjustedSuffix = (parseInt(categoryIdParts.digitsSuffix)+1).toString().padStart(4,"0");
	return categoryIdParts.prefix + adjustedSuffix 
}

// adjust for 0-based (nomis API, in this app) vs 1-based (nomis bulk, in the db) categories: QS101EW0002 -> QS101EW001
function dBColumnToCategoryID(dbColumn) {
	const dbColumnParts = decomposeNomisCategory(dbColumn);
	const adjustedSuffix = (parseInt(dbColumnParts.digitsSuffix)-1).toString().padStart(3,"0");
	return dbColumnParts.prefix + adjustedSuffix 
}

// get totals column (1-based, in the db) from category ID: QS101EW010 -> QS101EW0001
function categoryIDToDBTotalsColumn(categoryId) {
	const categoryIdParts = decomposeNomisCategory(categoryId);
	return categoryIdParts.prefix + "0001" 
}

export async function getNomis(categoryID, map) {
	// build URL
	

	// bbox query
	let mapBBox = map.getBounds()
    const bboxQuery = [
		mapBBox._sw.lng,
		mapBBox._sw.lat,
		mapBBox._ne.lng,
		mapBBox._ne.lat
	  ].join(",");

	const dbColumn = categoryIDToDBColumn(categoryID);
    const dbtotalsColumn = categoryIDToDBTotalsColumn(categoryID);
    const colsQuery = [
		"geography_code",
		dbtotalsColumn,
		dbColumn,
    ].join(",");
	const url = `${baseURL}?bbox=${bboxQuery}&cols=${colsQuery}`;
  	let response = await fetch(url);
  	let string = await response.text();
	let data = await csvParse(string, (d) => {
		return {
			code: d['geography_code'],
			value: +d[dbColumn],
			count: +d[dbtotalsColumn],
			perc: (+d[dbColumn] / +d[dbtotalsColumn]) * 100
		};
	});
	console.log(`${colsQuery} loaded for bounding box ${bboxQuery}`)
	return data;
}

export function processData(data, lsoaToLadMapping, categoryID, cachedIndex, EWdata) {
	let lsoa = {
		data: [],
		index: {}
	};
	let lad = {
		data: [],
		index: {}
	};
	let ew = {
		data: {
			value: 0,
			count: 0,
			perc: 0
		}
	};

	if (!(categoryID in cachedIndex)) {
		cachedIndex[categoryID] = new Set;
	}

	data.forEach(d => {
		cachedIndex[categoryID].add(d.code)
		if (d.code.slice(1,3) === '01') {
			// process lsoa data
			lsoa.index[d.code] = d
			lsoa.data.push(d)
		} else {
			// process lad data
			lad.index[d.code] = {
				code: d.code,
				value: d.value,
				count: d.count,
				perc: d.perc
			}
			lad.data.push(d)
		}
	})

	// copy appropriate EW data
	ew.data.value = EWdata[categoryID];
	ew.data.count = EWdata[dBColumnToCategoryID(categoryIDToDBTotalsColumn(categoryID))];
	ew.data.perc = (ew.data.value / ew.data.count) * 100

	// ADD MEDIAN (just the middle LSOA in terms of % for current data)
	// simple as we only have one LAD at any one time...
	const lsoasCodesInLad = Object.keys(lsoa.index)
	const codeForMedianLsoa = lsoasCodesInLad[Math.floor(lsoasCodesInLad.length / 2)]
	const medianLsoa = lsoa.index[codeForMedianLsoa]
	const ladCode = Object.keys(lad.index)[0]
	lad.index[ladCode].median = medianLsoa

	// copy:
	// - actual LAD data to all LADS
	// - median LSOA data to all LSOAs
	for (let child in lsoaToLadMapping) {
		let ladData = lad.index[ladCode]
		let parent = lsoaToLadMapping[child].parent
		ladData.code = parent
		lad.index[parent] = ladData
		lad.data.push(ladData)
		if (!(child in lsoa.index)) {
			lsoa.index[child] = medianLsoa
			lsoa.data.push(medianLsoa)
		}
	}

	// sort LSOA data
	lsoa.data.sort((a, b) => a.perc - b.perc)

	return {
		lsoa: lsoa,
		lad: lad,
		ew: ew
	};
}

export function getBreaks(chunks) {
	let breaks = [];

	chunks.forEach(chunk => {
		breaks.push(chunk[0]);
	});

	breaks.push(chunks[chunks.length - 1][chunks[chunks.length - 1].length - 1]);

	return breaks;
}

export function getThresholds(domain, exp, count = 32) {
	const offset = exp == 1 ? domain[0] : 0;
	const scale = domain[1] - offset;
	const breaks = [offset];
	const brek = 1 / count;
	for (let i = 1; i <= count; i ++) {
		let node = (Math.pow(i * brek, 1 / exp) * scale) + offset;
		if (node > domain[0]) {
			breaks.push(node);
		}
	}
	return breaks;
}
