<script>
  export let topicSlug, tableSlug, locationId;
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
  <div class="">
    <div class="">
      <span>&#60;&#160;</span>
      <a
        class="category-selector__button"
        href="/{topicSlug}/{tableSlug}/{categories[selectedCatIndex].slug}{locationQueryParam}"
        on:click={clickLeft}
      >
        {categories[leftIndex].name}
      </a>
    </div>
  </div>
  <div class="">
    <div class="">
      <a
        class="category-selector__button"
        href="/{topicSlug}/{tableSlug}/{categories[selectedCatIndex].slug}{locationQueryParam}"
        on:click={clickRight}
      >
        {categories[rightIndex].name}
      </a>
      <span>&#160;&#62;</span>
    </div>
  </div>
</div>

<style>
</style>
