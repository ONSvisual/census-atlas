<script>
  export let labelText, id, hint, autosuggestValue, autosuggestData;
  let n;

  function onClick({ target }) {
    autosuggestValue = target.innerText;
  }

  function onKeyUp(e) {
    if (e.keyCode === 13) {
      autosuggestValue = document.querySelector(".ons-autosuggest-input__option--focused").innerText;
    }
  }
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
      data-autosuggest-data={autosuggestData}
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
          bind:value={autosuggestValue}
          on:keyup={onKeyUp}
          class="ons-input ons-input--text ons-input-type__input ons-js-autosuggest-input "
          autocomplete="off"
          aria-describedby="{id}-label-description-hint"
        />
      </div>
      <div class="ons-autosuggest-input__results ons-js-autosuggest-results">
        <header id="{id}-suggestions" class="ons-autosuggest-input__results-title ons-u-fs-s">Suggestions</header>
        <ul
          on:click={onClick}
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
