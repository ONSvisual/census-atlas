# Census Atlas

A prototype for exploring neighbourhood level Census data tables on a map, powered by [Svelte Kit](https://kit.svelte.dev).

Latest version available at:
<https://ons-data-map.netlify.app>

## Architecture

See [ARCHITECTURE](ARCHITECTURE.md).

## Development

Clone the repository and install all dependencies with `npm install`, then start a development server:

```bash
npm run dev

# or start the server with https
npm run dev -- --https

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

There's an attempt at a kitchen sink with all the components at: [/components](http://localhost:3000/components) but please note it might be incomplete, or not up to date. This will eventually be replaced by something like [Storybook](https://storybook.js.org/).

There's also a page dedicated to [ONS Design System](https://ons-design-system.netlify.app/) components specifically: [/design-system](http://localhost:3000/design-system)

## Testing

### Unit

To run the full suite of unit tests:

```bash
npm test

# or to run an individual test file
npm test -- [fileName].test
```

### Integration

Run Cypress:

```bash
npx cypress open
```

## Deploy process

We're using [Netlify adapter](https://github.com/sveltejs/kit/tree/master/packages/adapter-netlify) at the moment which runs via GitHub Actions each time we push code.

There are [other adapters](https://kit.svelte.dev/docs#adapters) to suit our final target environment.

To build locally:

```bash
npm run build
```

To preview the built app:

```bash
npm run preview
```

## Bugs

Due to the [beta nature of Svelte Kit](https://svelte.dev/blog/sveltekit-beta) there might be issues requiring temporary workarounds.

In order to minimise the PITA factor:

- Make sure you're on latest `next` version: `npm upgrade @sveltejs/kit`
- If issue persist, check [their GitHub Issues page](https://github.com/sveltejs/kit/issues) and [changelogs](https://github.com/sveltejs/kit#packages) for pointers
- Join [Svelte's Discord](https://svelte.dev/chat) and search for your issue; this usually gives much better results than Google
