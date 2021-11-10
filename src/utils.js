import { feature } from 'topojson-client';
import { csvParse, autoType } from 'd3-dsv';

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

export async function getNomis(table, col_header, selectedLad, lsoaToLadMapping) {
	// build URL
	let firstLsoaInLad
	let previousLsoaInLad
	let lastLsoaInLad
	for (let lsoa in lsoaToLadMapping) {

		// if we have a match for lad...
		if (lsoaToLadMapping[lsoa].parent === selectedLad) {
			// ...and the first lsoa already is not already set, then set it...
			if (firstLsoaInLad === undefined) {
				firstLsoaInLad = lsoa
			}
			// ... regardless, store the lsoa for the next loop and continue
			previousLsoaInLad = lsoa
			continue
		}

		// if we do NOT have a match for lad, but the previousLsoaInLad IS set, then set the lastLsoaInLad and break
		if (previousLsoaInLad != undefined) {
			lastLsoaInLad = previousLsoaInLad
			break
		}

		// otherwise just continue looping through
	}
	// rows should include:
	// - range of first to last lsoas (NB ASSUMES ALL LADS BOUND A CONTINUOUS RANGE OF LSOAS, WHICH IS PROBABLY NOT TRUE)
	// - the lad itself
	// - all of england
	let rowQuery = `rows=geography_code:${firstLsoaInLad}...${lastLsoaInLad}&rows=geography_code:${selectedLad}&rows=geography_code:EW`
	let colQuery = `cols=geography_code,total,${col_header}`
	let url = `https://5laefo1cxd.execute-api.eu-central-1.amazonaws.com/dev/hello/atlas2011.${table}?${rowQuery}&${colQuery}`
  let response = await fetch(url);
  let string = await response.text();
	let data = await csvParse(string, (d, i) => {
		return {
			code: d['geography_code'],
			value: +d[col_header],
			count: +d['total'],
			perc: (+d[col_header] / +d['total']) * 100
		};
	});
  return data;
}

export function processData(data, lsoaToLadMapping) {
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

	data.forEach(d => {
		if (d.code === 'EW') {
			// process country data
			ew.data.value = d.value
			ew.data.count = d.count
			ew.data.perc = d.perc
		} else if (d.code.slice(1,3) === '01') {
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
		lsoa.index[child] = medianLsoa
		lsoa.data.push(medianLsoa)
	}

	// sort LSOA data

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
