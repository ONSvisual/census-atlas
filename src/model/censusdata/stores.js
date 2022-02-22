import { writable } from "svelte/store";

export let mapBBoxCodes = writable([]);

export const toggleable = (initial) => {
  const store = writable(initial);

  return {
    ...store,
    setTrue: () => {
      store.set(true);
    },
    setFalse: () => {
      store.set(false);
    },
  };
};
