# Census Atlas

A prototype for exploring neighbourhood level Census data tables on a map, powered by [Svelte Kit](https://kit.svelte.dev).

## Developing

Clone the repository and install all dependencies with `yarn`, then start a development server:

<!--
XXX: There's currently a [bug in SvelteKit](https://github.com/sveltejs/kit/pull/2885) that prevents running npm from working fine there hence yarn.
-->

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev --open
```

<!--
### Storybook

`npm run storybook` – fires up [Storybook](https://storybook.js.org/docs/react/writing-stories/introduction)
-->

## Building

```bash
yarn build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
