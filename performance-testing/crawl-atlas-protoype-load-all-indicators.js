// click on all unexpanded drop-down span elements for indicates. Loop n times with 1 second timeout between
// each loop to ensure all are expanded.
var unexpanded_dropdowns;
var n_loops=10;
for (i=1; i<=n_loops+1; i++) {
  if (i<=n_loops) {
    setTimeout(
      () => {
        unexpanded_dropdowns = document.querySelectorAll('span.svelte-rq9fus:not(.expanded)');
        unexpanded_dropdowns.forEach(dropdown => dropdown.click());
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
