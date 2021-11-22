import {writable} from "svelte/store";

export let categoryDataIsLoaded = writable(false)
export let tableIsLoaded = writable(false)


export let categoryData = {}
export let tableData = {}
export let breaks = []

let dataService = null

export function initialiseCensusData(censusDataService) {
  dataService = censusDataService
}

export async function fetchCensusData(categoryCode, geographyCode) {
  categoryDataIsLoaded.set(false)
  
  // Do a simple data load
  let lsoaData = await dataService.fetchLsoaCategoryData(categoryCode)
  let higherData = await dataService.fetchHigherGeographyCategoryData(categoryCode)
  
  categoryData = {...lsoaData, ...higherData}
  breaks = await dataService.fetchLegendBreakpoints(categoryCode)
  categoryDataIsLoaded.set(true)
}

