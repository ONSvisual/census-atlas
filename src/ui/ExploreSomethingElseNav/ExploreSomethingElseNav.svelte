<script>
  export let firstLink,
    secondLink = { text: null, url: null };
</script>

<div class="component-margin--2">
  <h2 class="ons-u-fs-m ons-u-mb-xs">Explore something else</h2>
  {#if firstLink}
    <p class="ons-u-mb-xs"><a href={firstLink.url}>{firstLink.text}</a></p>
  {/if}
  {#if secondLink}
    <p class="ons-u-mb-xs"><a href={"" || secondLink.url} on:click>{secondLink.text}</a></p>
  {/if}
  <p class="ons-u-mb-xs"><a href="/">Back to the start</a></p>
</div>

<style>
  .component-margin--2 {
    margin-bottom: 2rem;
  }
</style>
