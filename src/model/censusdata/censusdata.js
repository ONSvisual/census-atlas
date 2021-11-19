import {writable} from "svelte/store";

export let categoryDataIsLoaded = writable(false)
export let tableIsLoaded = writable(false)


export let categoryData = writable({})
export let tableData = writable({})

let dataService = null

export function initialiseCensusDataService(censusDataService) {
  dataService = censusDataService
}

export async function fetchCensusData(categoryCode, geographyCode) {
  dataService.fetchLsoaCategoryData(categoryCode)
}

