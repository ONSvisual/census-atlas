import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({
    // ...svelte-preprocess options
  }),
  kit: {
    ssr: false,
    files: {
      assets: "public",
      routes: "src/routes",
      template: "src/app.html",
    },
    target: "#svelte", // hydrate the <div id="svelte"> element in src/app.html
  },
};

export default config;
