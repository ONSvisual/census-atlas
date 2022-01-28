<script>
  import DisplaySelectedCatFigures from "./DisplaySelectedCatFigures.svelte";

  export let topicSlug, tableSlug, locationId, selectedCatData;
  export let categories = [];
  export let selectedCategory = "";

  $: locationQueryParam = locationId ? `?location=${locationId}` : "";
  let leftIndex, rightIndex, selectedCatIndex;

  const findSelectedCatIndex = (category) => category.code === selectedCategory;
  selectedCatIndex = categories.findIndex(findSelectedCatIndex);

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
        {categories[selectedCatIndex].name}
      </div>
    </div>
    <div class="ons-grid__col ons-col-4@xxs">
      <div class="category-selector__stats">
        <DisplaySelectedCatFigures {selectedCatData} />
      </div>
    </div>
  </div>
  <div class="category-selector__links">
    <a
      class="category-selector__link category-selector__link--previous"
      href="/{topicSlug}/{tableSlug}/{categories[selectedCatIndex].slug}{locationQueryParam}"
      on:click={clickLeft}
    >
      <span>{categories[leftIndex].name}</span>
    </a>

    <a
      class="category-selector__link category-selector__link--next"
      href="/{topicSlug}/{tableSlug}/{categories[selectedCatIndex].slug}{locationQueryParam}"
      on:click={clickRight}
    >
      <span>{categories[rightIndex].name}</span>
    </a>
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
      span {
        color: $color-white;
        padding: 0 16px 0 16px;
        align-self: center;
        overflow-wrap: anywhere;
      }
      &--previous {
        & span {
          background: url(./chevron--left.svg) no-repeat 0 50%;
        }
      }
      &--next {
        text-align: right;
        justify-content: end;
        border-left: 1px solid rgba($color-white, 0.5);
        & span {
          background: url(./chevron--right.svg) no-repeat 100% 50%;
        }
      }
    }
  }
</style>
