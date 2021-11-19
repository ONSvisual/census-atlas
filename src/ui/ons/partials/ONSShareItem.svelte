<script>
  import { getContext } from "svelte";
  import ShareItemWrapper from "../../ShareItemWrapper.svelte";
  export let url, shareText;
  export let facebook = false;
  export let twitter = false;
  export let linkedin = false;
  export let email = false;
  let href = facebook
    ? `https://www.facebook.com/sharer/sharer.php?u=${url}`
    : twitter
    ? `https://twitter.com/intent/tweet?original_referer&amp;text=A page to share&amp;url=${url}`
    : linkedin
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    : email
    ? `https://mail.google.com/mail/?view=cm&fs=1&tf=1&body=${url}`
    : "";
  let censusAtlasSharePage = getContext("censusAtlasSharePage");
</script>

<ShareItemWrapper {censusAtlasSharePage}>
  <li class="ons-list__item">
    <span class="ons-list__prefix" aria-hidden="true">
      <slot />
    </span><a {href} class="ons-list__link  " target="_blank" rel="noreferrer external"
      >{shareText}<span class="ons-u-vh">this link will open in a new tab</span></a
    >
  </li>
</ShareItemWrapper>
