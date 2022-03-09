<script>
  export let tableName, topicSlug, tableSlug, locationId, selectedCategory;
  export let categories = [];

  $: locationQueryParam = locationId ? `?location=${locationId}` : "";
  let leftIndex, rightIndex, selectedCatIndex, isMultiSelect, isInitialCat;

  const findSelectedCatIndex = (category) => category.code === selectedCategory.code;
  selectedCatIndex = categories.findIndex(findSelectedCatIndex);

  /* isMultiSelect, flag is used to fix a ui issue with an array less than or equal to two showing the same category for both the previous and next links */
  isMultiSelect = categories.length > 2;
  $: isInitialCat = selectedCatIndex === 0;
  if (categories && selectedCatIndex === categories.length - 1) {
    rightIndex = 0;
    leftIndex = selectedCatIndex - 1;
  } else if (selectedCatIndex === 0) {
    leftIndex = categories.length - 1;
    rightIndex = selectedCatIndex + 1;
  } else {
    leftIndex = selectedCatIndex - 1;
    rightIndex = selectedCatIndex + 1;
  }

  function clickRight() {
    leftIndex = selectedCatIndex;
    selectedCatIndex = rightIndex;
    if (rightIndex === categories.length - 1) {
      rightIndex = 0;
    } else {
      rightIndex = rightIndex + 1;
    }
  }

  function clickLeft() {
    rightIndex = selectedCatIndex;
    selectedCatIndex = leftIndex;
    if (leftIndex === 0) {
      leftIndex = categories.length - 1;
    } else {
      leftIndex = leftIndex - 1;
    }
  }
</script>

<div class="category-selector">
  <div class="ons-grid ons-grid--gutterless ons-grid--vertical-center">
    <div class="ons-grid__col ons-col-8@xxs">
      <div class="category-selector__category">
        Part of: {tableName}
      </div>
    </div>
  </div>
  <div class="category-selector__links">
    {#if isMultiSelect}
      <p class="category-selector__link category-selector__link--previous">
        <a href="/{topicSlug}/{tableSlug}/{categories[selectedCatIndex].slug}{locationQueryParam}" on:click={clickLeft}>
          {categories[leftIndex].name}
        </a>
      </p>

      <p class="category-selector__link category-selector__link--next">
        <a
          href="/{topicSlug}/{tableSlug}/{categories[selectedCatIndex].slug}{locationQueryParam}"
          on:click={clickRight}
        >
          {categories[rightIndex].name}
        </a>
      </p>
    {:else}
      {#if isInitialCat} <p class="category-selector__link" />{/if}
      <p class={`category-selector__link category-selector__link--${isInitialCat ? "next" : "previous"}`}>
        <a
          href="/{topicSlug}/{tableSlug}/{categories[selectedCatIndex].slug}{locationQueryParam}"
          on:click={() => (isInitialCat ? clickRight() : clickLeft())}
        >
          {categories[isInitialCat ? rightIndex : leftIndex].name}
        </a>
      </p>
      {#if !isInitialCat} <p class="category-selector__link--divider" />{/if}
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";

  .category-selector {
    background: #003c57;
    margin: -18px -18px 0;
    padding: 12px 18px;
    color: $color-white;

    &__category {
      font-size: 16px;
      line-height: 20px;
      font-weight: 700;
      padding-right: 18px;
      overflow-wrap: anywhere;
      @media (min-width: map-get($grid-bp, s)) {
        font-size: 20px;
        line-height: 25px;
      }
    }
    &__stats {
      margin: -12px -18px 0 0;
    }

    &__links {
      margin-top: 18px;
      display: flex;
      align-items: stretch;
    }
    &__link {
      display: flex;
      width: 50%;
      font-size: 13px;
      line-height: 18px;
      @media (min-width: map-get($grid-bp, s)) {
        font-size: 16px;
        line-height: 22px;
      }
      a {
        margin: 0 16px 0 16px;
        align-self: center;
        overflow-wrap: anywhere;
        color: $color-white;
        &:hover {
          text-decoration: underline solid $color-white 2px;
        }
        &:focus {
          span {
            background-color: $color-sun-yellow;
            -webkit-box-shadow: 0 -2px $color-sun-yellow, 0 4px $color-black;
            box-shadow: 0 -2px $color-sun-yellow, 0 4px $color-black;
            color: $color-black;
            outline: 3px solid transparent;
            text-decoration: none;
          }
        }
      }
      &--previous {
        background: url(./chevron--left.svg) no-repeat 0 50%;
      }
      &--divider {
        border-right: 1px solid rgba($color-white, 0.5);
      }
      &--next {
        text-align: right;
        justify-content: end;
        border-left: 1px solid rgba($color-white, 0.5);
        background: url(./chevron--right.svg) no-repeat 100% 50%;
      }
    }
  }
</style>
