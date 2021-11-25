# Census Atlas

A prototype for exploring neighbourhood level Census data tables on a map, powered by [Svelte Kit](https://kit.svelte.dev).

## Developing

Clone the repository and install all dependencies with `npm install`, then start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

We're using [Netlify adapter](https://github.com/sveltejs/kit/tree/master/packages/adapter-netlify) at the moment. There are [other adapters](https://kit.svelte.dev/docs#adapters) to suit our final target environment.

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
