import { writable } from "svelte/store";

export let appIsInitialised = writable(false);

export const setInitialised = () => {
  appIsInitialised.set(true);
};
