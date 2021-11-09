// click on all unexpanded drop-down span elements for indicates. Loop n times with 1 second timeout between
// each loop to ensure all are expanded.
const n_menu_expansion_loops=10;
const n_radios_to_click=1;
for (i=1; i<=n_menu_expansion_loops+1; i++) {
  if (i<=n_menu_expansion_loops) {
    setTimeout(
      () => {
        document.querySelectorAll('span.svelte-rq9fus:not(.expanded)').forEach(dropdown => dropdown.click());
      },
      i*1000
    )
  } else {
    // final loop - set off routine to click on all radio buttons
    setTimeout(
      () => {
        // (hopefully) all radio buttons that load indicator datasets are now rendered, so collect them
        radios = document.querySelectorAll('input.svelte-1vonfiw[type=radio]');
        // click on all radios to load indicators, with 2 second timeout between each to allow load
        for (let i=0; i<radios.length; i++) {
          if (i>=n_radios_to_click){break}
          setTimeout(
            () => {
              radios[i].click()
            },
            i*2000
          )
        }
      },
      i*1000
    )
  }
}
