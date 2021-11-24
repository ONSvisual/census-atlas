# Census-Atlas architecture

A prototype for exploring neighbourhood level Census data tables on a map.

## Svelte architecture

### Presentation layer

Files: \*.svelte
Responsibilities: Displaying the current state of the app according to the designs from UI/UX

### Model layer

Files: \*Store.js
Responsibilities: Storing the current state of the app. Provide action methods to update state.

### Data layer

Files: \*Service.js
Responsibilities: Fetch data to update the model

`npm run storybook` – fires up [Storybook](https://storybook.js.org/docs/react/writing-stories/introduction)
