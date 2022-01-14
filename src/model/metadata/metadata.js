import { writable } from "svelte/store";

export const censusMetadata = writable([])

export async function fetchCensusMetadata(metadataService){
    const data = await metadataService.fetchCensusMetadata()
    censusMetadata.set(data)
}