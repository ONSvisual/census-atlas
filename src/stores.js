import { writable } from "svelte/store";
import { browser } from "$app/env";

export let pageUrl = writable(browser && (sessionStorage.getItem("pageUrl") || ""));
pageUrl.subscribe((val) => browser && sessionStorage.setItem("pageUrl", val));
