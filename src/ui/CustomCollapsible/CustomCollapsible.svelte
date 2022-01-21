<script>
  export let title = "";
  export let id = "collapsible-table";
  let expanded = false;
  $: expandedCollapsible = expanded ? "ons-collapsible--open" : "";
  $: displayContent = expanded ? "ons-collapsible--open__content" : "ons-collapsible--initialised__content";
  $: changeIcon = expanded ? "ons-collapsible--open__icon" : "ons-collapsible--initialised__icon";
  $: displayHideButton = expanded ? "" : "ons-u-d-no";
  $: dataAction = expanded ? "Open panel" : "Close panel";
</script>

<div
  id="collapsible"
  class="ons-collapsible ons-collapsible--initialised {expandedCollapsible}"
  data-btn-close="Hide this"
  role="group"
  aria-expanded={expanded}
>
  <div
    {id}
    class="ons-collapsible__heading"
    role="link"
    aria-controls="collapsible"
    tabindex="0"
    data-ga-action={dataAction}
    on:click={() => (expanded = !expanded)}
  >
    <div class="ons-collapsible__controls">
      <p class="ons-collapsible__title">{title ? `Show ${title} options` : ""}</p>
      <span class="ons-collapsible__icon {changeIcon}">
        <svg
          class="ons-svg-icon "
          viewBox="0 0 8 13"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
          fill="currentColor"
        >
          <path
            d="M5.74,14.28l-.57-.56a.5.5,0,0,1,0-.71h0l5-5-5-5a.5.5,0,0,1,0-.71h0l.57-.56a.5.5,0,0,1,.71,0h0l5.93,5.93a.5.5,0,0,1,0,.7L6.45,14.28a.5.5,0,0,1-.71,0Z"
            transform="translate(-5.02 -1.59)"
          />
        </svg>
      </span>
    </div>
  </div>
  <div
    id="collapsible-content"
    class="ons-collapsible__content {displayContent}"
    aria-hidden={expanded ? "false" : "true"}
  >
    <slot />
    <button
      type="button"
      class="ons-btn {displayHideButton} ons-btn--secondary ons-btn--small"
      aria-hidden={expanded ? "false" : "true"}
      data-ga-action={dataAction}
      on:click={() => (expanded = !expanded)}
    >
      <span class="ons-btn__inner">Hide this</span>
      <span class="ons-btn__context ons-u-vh">{title}</span>
    </button>
  </div>
</div>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";
  @import "../../node_modules/@ons/design-system/scss/helpers/_index.scss";

  $collapsible-caret-width: 1.5rem;

  .ons-collapsible--open {
    &__content {
      border-left: 4px solid $color-borders-indent;
      display: block;
      margin: 1rem 0 0;
      padding: 0 0 0 1.3em;

      .ons-btn {
        margin-bottom: 0.5rem;
      }
    }
    &__icon {
      left: -0.1rem;
      top: 1rem;
      transform: rotate(90deg);
    }
  }

  .ons-collapsible--initialised {
    &__content {
      display: none;
    }
    &__icon {
      display: inline-block;
      fill: $color-text-link;
      height: $collapsible-caret-width;
      left: -0.2rem;
      position: absolute;
      top: 1rem;
      width: $collapsible-caret-width;
      transform: none;
    }
  }
  .ons-collapsible__title {
    font-weight: normal;
  }
  .ons-collapsible__heading {
    border-top: none;
  }
</style>
