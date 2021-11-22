import {writable} from "svelte/store";
import config from '../../config'

// CONSTANTS
// initialised below
export var ladBoundaries = [];
export var ladList = [];
export var ladLookup = {};
export var lsoaLookup = {};

// WRITABLES
// reactive variables that can be subscribed to in our Svelte files
export let loadingGeography = writable(false)
export let selectedGeography = writable({
  lad: null,
  lsoa: null
})
export let hoveredGeography = writable({
  lad: null,
  lsoa: null
})
export let zoom = writable(config.ux.default_zoom)


// ACTIONS
export function updateSelectedGeography(geographyCode) {
  selectedGeography.set(getLadAndLsoa(geographyCode))
}

export function updateHoveredGeography(geographyCode) {
  hoveredGeography.set(getLadAndLsoa(geographyCode))
}

export function updateZoom(newZoom) {
  zoom.set(newZoom)
}

// ------

function getLadAndLsoa(geographyCode) {
  if (ladLookup[geographyCode] === null) {
    return {
      lad: lsoaLookup[geographyCode].parent,
      lsoa: geographyCode
    }
  } else {
    return {
      lad: geographyCode,
      lsoa: null
    }
  }
}

// RESET (for tests)

export function reset() {
  ladBoundaries = [];
  ladList = [];
  ladLookup = {};
  lsoaLookup = {};
  loadingGeography.set(false)
  selectedGeography.set({
    lad: null,
    lsoa: null
  })
  hoveredGeography.set({
    lad: null,
    lsoa: null
  })
}

// INITIALISERS
const LAD_AREA_CODE = "AREACD";
const LAD_AREA_NAME = "AREANM";

export async function initialiseGeography(geographyService) {
  loadingGeography.set(true)
  ladBoundaries = await geographyService.getLadBoundaries();
  let lsoaData = await geographyService.getLsoaData();

  ladLookup = buildLadLookup(ladBoundaries, lsoaData);
  lsoaLookup = buildLsoaLookup(lsoaData);
  ladList = buildLadList(ladBoundaries, ladLookup);

  loadingGeography.set(false)
}

function buildLadList(ladBounds, ladLookup) {
  return ladBounds.features.map((f) => {
    let code = f.properties[LAD_AREA_CODE];
    return {
      code: ladLookup[code].code,
      name: ladLookup[code].name,
    };
  });
}

function buildLadLookup(ladBounds, lsoaData) {
  let lookup = {};
  ladBounds.features.forEach((f) => {
    lookup[f.properties[LAD_AREA_CODE]] = {
      code: f.properties[LAD_AREA_CODE],
      name: f.properties[LAD_AREA_NAME],
    };
  });

  lsoaData.forEach((d) => {
    if (!lookup[d.parent].children) {
      lookup[d.parent].children = [d.code];
    } else {
      lookup[d.parent].children.push(d.code);
    }
  });

  return lookup;
}

function buildLsoaLookup(lsoaData) {
  lsoaLookup = {};
  lsoaData.forEach((d) => {
    lsoaLookup[d.code] = {
      name: d.name,
      parent: d.parent,
    };
  });
  return lsoaLookup;
}
