<script>
  export let labelText = "Current name of country";
  export let id = "country-of-birth";
  export let hint = "Enter your own answer or select from suggestions";
</script>

<div class="ons-grid ons-grid--gutterless">
  <div class="ons-grid__col ons-col-8@m">
    <div
      id="{id}-container"
      class="ons-js-autosuggest   ons-autosuggest-input"
      data-instructions="Use up and down keys to navigate suggestions once you&#39;ve typed more than two characters. Use the enter key to select a suggestion. Touch device users, explore by touch or with swipe gestures."
      data-aria-you-have-selected="You have selected"
      data-aria-min-chars="Enter 3 or more characters for suggestions."
      data-aria-one-result="There is one suggestion available."
      data-aria-n-results="There are {n} suggestions available."
      data-aria-limited-results="Results have been limited to 10 suggestions. Type more characters to improve your search"
      data-more-results="Continue entering to improve suggestions"
      data-results-title="Suggestions"
      data-no-results="No suggestions found. You can enter your own answer"
      data-type-more="Continue entering to get suggestions"
      data-autosuggest-data="https://gist.githubusercontent.com/rmccar/c123023fa6bd1b137d7f960c3ffa1fed/raw/4dede1d6e757cf0bb836228600676c62ceb4f86c/country-of-birth.json"
    >
      <div class="ons-field">
        <label class="ons-label  {hint ? 'ons-label--with-description' : ''}" for={id} id="{id}-label"
          >{labelText}
        </label>
        {#if hint}
          <span id="{id}-label-description-hint" class="ons-label__description  ons-input--with-description">
            {hint}
          </span>
        {/if}
        <input
          type="text"
          {id}
          class="ons-input ons-input--text ons-input-type__input ons-js-autosuggest-input "
          autocomplete="off"
          aria-describedby="{id}-label-description-hint"
        />
      </div>
      <div class="ons-autosuggest-input__results ons-js-autosuggest-results">
        <header id="{id}-suggestions" class="ons-autosuggest-input__results-title ons-u-fs-s">Suggestions</header>
        <ul
          class="ons-autosuggest-input__listbox ons-js-autosuggest-listbox"
          role="listbox"
          id="{id}-listbox"
          aria-labelledby="{id}-suggestions"
          tabindex="-1"
        />
      </div>
      <div
        class="ons-autosuggest-input__instructions ons-u-vh ons-js-autosuggest-instructions"
        id="{id}-instructions"
        tabindex="-1"
      >
        Use up and down keys to navigate suggestions once you&#39;ve typed more than two characters. Use the enter key
        to select a suggestion. Touch device users, explore by touch or with swipe gestures.
      </div>
      <div
        class="ons-autosuggest-input__status ons-u-vh ons-js-autosuggest-aria-status"
        aria-live="assertive"
        role="status"
        tabindex="-1"
      />
    </div>
  </div>
</div>
