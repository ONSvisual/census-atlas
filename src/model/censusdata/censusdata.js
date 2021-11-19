import {writable} from "svelte/store";

export let categoryDataIsLoaded = writable(false)
export let tableIsLoaded = writable(false)


export let categoryData = {}
export let tableData = {}

let dataService = null

export function initialiseCensusDataService(censusDataService) {
  dataService = censusDataService
}

export async function fetchCensusData(categoryCode, geographyCode) {
  categoryDataIsLoaded.set(false)
  
  // at the moment
  let higherData = await dataService.fetchHigherGeographyCategoryData(categoryCode)
  let lsoaData = await dataService.fetchLsoaCategoryData(categoryCode)
   categoryData = {...lsoaData, ...higherData}
  
  categoryDataIsLoaded.set(true)
}

