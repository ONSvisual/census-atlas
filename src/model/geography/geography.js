import { writable } from "svelte/store";
import config from "./../../config";

// CONSTANTS
// initialised below
export var ladBoundaries = [];
export var ladList = [];
export var ladLookup = {};
export var reverseLadLookup = {};
export var lsoaLookup = {};

// WRITABLES
// reactive variables that can be subscribed to in our Svelte files
export let loadingGeography = writable(false);
export let selectedGeography = writable({
  lad: null,
  lsoa: null,
});
export let hoveredGeography = writable({
  lad: null,
  lsoa: null,
});
export let zoom = writable(config.ux.default_zoom);

// ACTIONS
export function updateSelectedGeography(geographyCode) {
  selectedGeography.set(getLadAndLsoa(geographyCode));
}

export function updateHoveredGeography(geographyCode) {
  hoveredGeography.set(getLadAndLsoa(geographyCode));
}

export function updateZoom(newZoom) {
  zoom.set(newZoom);
}

// ------

export function getLadAndLsoa(geographyCode) {
  if (lsoaLookup[geographyCode]) {
    return {
      lad: lsoaLookup[geographyCode].parent,
      lsoa: geographyCode,
    };
  } else {
    return {
      lad: geographyCode,
      lsoa: null,
    };
  }
}

export function getLadName(geographyCode) {
  if (ladLookup[geographyCode]) {
    return ladLookup[geographyCode].name;
  }
  return geographyCode;
}

// RESET (for tests)

export function reset() {
  ladBoundaries = [];
  ladList = [];
  ladLookup = {};
  lsoaLookup = {};
  loadingGeography.set(false);
  selectedGeography.set({
    lad: null,
    lsoa: null,
  });
  hoveredGeography.set({
    lad: null,
    lsoa: null,
  });
  zoom.set(config.ux.default_zoom);
}

// INITIALISERS
export async function initialiseGeography(geographyService) {
  loadingGeography.set(true);
  let ladList = await geographyService.getLadList();
  let lsoaData = await geographyService.getLsoaData();

  ladLookup = buildLadLookup(ladList, lsoaData);
  reverseLadLookup = buildReverseLadLookup(ladList);
  lsoaLookup = buildLsoaLookup(lsoaData);

  loadingGeography.set(false);
}

function buildLadLookup(ladList, lsoaData) {
  let lookup = {};
  ladList.forEach((d) => {
    lookup[d.code] = {
      code: d.code,
      name: d.name,
      children: [],
    };
  });

  lsoaData.forEach((d) => {
    lookup[d.parent].children.push(d.code);
  });

  return lookup;
}

function buildReverseLadLookup(ladList) {
  let lookup = {};
  ladList.forEach((d) => {
    lookup[d.name] = d.code;
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

export function setMapBBoxGeoCodes(map, mapBboxCodes) {
  const bBoxCodes = map
    .queryRenderedFeatures({ layers: ["lad-interactive-layer", "lsoa-boundaries"] })
    .map((feature) => feature.id);
  const filteredCodes = [...new Set(bBoxCodes)];
  mapBboxCodes.set(filteredCodes);
}
