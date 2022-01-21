<script>
  export let topicSlug, tableSlug, locationId;
  export let categories = [
    {
      code: "QS302EW001",
      name: "Very good health",
    },
    {
      code: "QS302EW002",
      name: "Good health",
    },
    {
      code: "QS302EW003",
      name: "Fair health",
    },
    {
      code: "QS302EW004",
      name: "Bad health",
    },
    {
      code: "QS302EW005",
      name: "Very bad health",
    },
  ];

  export let selectedCategory = "QS302EW005";

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

<div class="category-selector ons-grid--flex ons-grid--vertical-center">
  <div class="ons-grid__col ons-col-4@m selector-col ">
    <div class="ons-pl-grid-col ons-grid--flex ons-grid__col--flex" style="justify-content:left">
      <span>&#60;&#160;</span>
      <a
        class="category-selector__button cut-text"
        href="/{topicSlug}/{tableSlug}/{categories[selectedCatIndex].slug}{locationQueryParam}"
        on:click={clickLeft}
      >
        {categories[leftIndex].name}
      </a>
    </div>
  </div>
  <div class="ons-grid__col ons-col-4@m selector-col ons-grid--flex">
    <div class="ons-pl-grid-col">
      <p class="cut-text">{categories[selectedCatIndex].name}</p>
    </div>
  </div>
  <div class="ons-grid__col ons-col-4@m selector-col">
    <div class="ons-pl-grid-col ons-grid--flex" style="justify-content:right">
      <a
        class="category-selector__button category-selector__button__left cut-text"
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
  .cut-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .category-selector {
    background-color: #003c57;
    color: #fff;
    padding: 10px 15px 10px;
  }
  .category-selector__button {
    color: #fff;
    font-size: 1rem;
    font-weight: normal;
  }

  .category-selector__button__left {
    text-align: right;
  }
  @media (max-width: 400px) {
    .category-selector__button,
    span {
      font-size: 0.8em;
    }
  }
  .category-selector__button {
    text-decoration: underline;
    text-underline-position: unset;
  }
  .selector-col {
    max-width: 33.33333%;
    width: 33.33333%;
    padding-left: 0;
  }
  p {
    text-align: center;
    margin-bottom: 0;
    font-size: 1.3em;
    font-weight: bold;
  }
  .ons-grid--flex {
    flex-wrap: nowrap;
    align-items: center;
  }

  @media (max-width: 400px) {
    p {
      font-size: 1em;
    }
  }
</style>
