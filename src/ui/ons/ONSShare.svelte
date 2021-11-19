<script>
  import { setContext } from "svelte";
  export let title = "Share this post";
  export let censusAtlasSharePage = false;
  export let pageURL, pageTitle;
  setContext("censusAtlasSharePage", censusAtlasSharePage);
  setContext("pageURL", pageURL);
  setContext("pageTitle", pageTitle);
</script>

<h2 class="ons-u-fs-r--b ons-u-mb-xs">{title}</h2>
<ul class="ons-list ons-list--inline ons-list--bare ons-list--icons">
  {#if censusAtlasSharePage}
    <div class="ons-grid"><slot /></div>
  {:else}
    <slot />
  {/if}
</ul>

<style>
  .ons-grid {
    width: 80%;
  }
</style>
