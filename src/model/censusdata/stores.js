import { writable } from "svelte/store";

export let mapBBoxCodes = writable([]);

export const toggleable = (initial) => {
  const store = writable(initial);

  return {
    ...store,
    notify: () => {
      store.update((n) => !n);
      store.update((n) => !n);
    },
  };
};
