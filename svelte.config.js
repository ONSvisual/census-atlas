import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-netlify";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({
    scss: {
      includePaths: ["./node_modules/normalize.css/"],
    },
  }),
  kit: {
    adapter: adapter(),
    ssr: false,
    target: "#svelte", // hydrate the <div id="svelte"> element in src/app.html
    vite: {
      build: {
        target: ["es6"],
      },
    },
  },
};

export default config;
