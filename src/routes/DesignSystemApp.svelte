<script>
  import ONSCensusApp from "../ui/ons/ONSCensusApp.svelte";
  import ONSAccordion from "../ui/ons/ONSAccordion.svelte";
  import ONSAccordionPanel from "../ui/ons/partials/ONSAccordionPanel.svelte";
  import ONSBacklink from "../ui/ons/ONSBacklink.svelte";
  import ONSBreadcrumbs from "../ui/ons/ONSBreadcrumbs.svelte";
  import ONSBreadcrumb from "../ui/ons/partials/ONSBreadcrumb.svelte";
  import ONSButton from "../ui/ons/ONSButton.svelte";
  import ONSCard from "../ui/ons/ONSCard.svelte";
  import ONSCheckboxes from "../ui/ons/ONSCheckboxes.svelte";
  import ONSCheckbox from "../ui/ons/partials/ONSCheckbox.svelte";
  import ONSCollapsible from "../ui/ons/ONSCollapsible.svelte";
  import ONSTextField from "../ui/ons/ONSTextField.svelte";
  import ONSRadios from "../ui/ons/ONSRadios.svelte";
  import ONSRadio from "../ui/ons/partials/ONSRadio.svelte";
  import ONSTextArea from "../ui/ons/ONSTextArea.svelte";
  import ONSShare from "../ui/ons/ONSShare.svelte";
  import ONSHeader from "../ui/ons/ONSHeader.svelte";
  import ONSSelect from "../ui/ons/ONSSelect.svelte";
  import ONSSkipLink from "../ui/ons/ONSSkipLink.svelte";
  import Feedback from "../ui/Feedback.svelte";
  import ONSExternalHeaderWithDescription from "../ui/ons/ONSExternalHeaderWithDescription.svelte";
  import DesignSystemPanel from "../ui/DesignSystemPanel.svelte";

  let serviceTitle = "Design System";
  let serviceDescription = "Components implemented with Svelte";
  let textFieldValue = "";
  let inputErrorValue = "";
</script>

<svelte:head>
  <script defer src="/build/ons-design-system.js"></script>
</svelte:head>

<ONSSkipLink />
<ONSExternalHeaderWithDescription {serviceTitle} description={serviceDescription} />
<ONSSkipLink />

<ONSCensusApp>
  <DesignSystemPanel title="Backlink" code={`<ONSBacklink href="/home"/>`}>
    <ONSBacklink href="/home" />
  </DesignSystemPanel>

  <DesignSystemPanel title="Header" code={`<ONSExternalHeaderWithDescription />`}>
    <ONSExternalHeaderWithDescription
      serviceTitle="Explore Census"
      description="Here's a place where we tell users what the Census Atlas is and what it can do for them."
    />
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Breadcrumbs"
    code={`<ONSBreadcrumbs>
  <ONSBreadcrumb href="/home">Home</ONSBreadcrumb>
  <ONSBreadcrumb href="/home/layer-1">Layer 1</ONSBreadcrumb>
</ONSBreadcrumbs>`}
  >
    <ONSBreadcrumbs>
      <ONSBreadcrumb href="/home">Home</ONSBreadcrumb>
      <ONSBreadcrumb href="/home/layer-1">Layer 1</ONSBreadcrumb>
    </ONSBreadcrumbs>
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Button"
    code={`<ONSButton onClick={() => alert("Custom on click handler")}>Custom onclick handler</ONSButton>`}
  >
    <ONSButton onClick={() => alert("Custom on click handler")}>Custom onclick handler</ONSButton>
  </DesignSystemPanel>
  <DesignSystemPanel title="Secondary button" code={`<ONSButton secondary>Secondary</ONSButton>`}>
    <ONSButton secondary>Secondary</ONSButton>
  </DesignSystemPanel>
  <DesignSystemPanel title="Small button" code={`<ONSButton small>Small</ONSButton>`}>
    <ONSButton small>Small</ONSButton>
  </DesignSystemPanel>
  <DesignSystemPanel title="Secondary small button" code={`<ONSButton secondary small>Secondary small</ONSButton>`}>
    <ONSButton secondary small>Secondary small</ONSButton>
  </DesignSystemPanel>
  <DesignSystemPanel title="Disabled button" code={`<ONSButton disabled>Disabled</ONSButton>`}>
    <ONSButton disabled>Disabled</ONSButton>
  </DesignSystemPanel>
  <DesignSystemPanel title="Card" code={`<ONSCard title="ONS Card" href="/home">Card</ONSCard>`}>
    <ONSCard title="ONS Card" href="/home">Card</ONSCard>
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Checkboxes"
    code={`<ONSCheckboxes>
  <ONSCheckbox id="mobile">Mobile</ONSCheckbox>
  <ONSCheckbox id="laptop">Laptop</ONSCheckbox>
  <ONSCheckbox id="tablet">Tablet</ONSCheckbox>
</ONSCheckboxes>`}
  >
    <ONSCheckboxes>
      <ONSCheckbox id="mobile">Mobile</ONSCheckbox>
      <ONSCheckbox id="laptop">Laptop</ONSCheckbox>
      <ONSCheckbox id="tablet">Tablet</ONSCheckbox>
    </ONSCheckboxes>
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Collapsible"
    code={`<ONSCollapsible title="Collapsible">
  <span>here is the collapsible content</span>
</ONSCollapsible>`}
  >
    <ONSCollapsible title="Collapsible">
      <span>here is the collapsible content</span>
    </ONSCollapsible>
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Input"
    code={`<ONSTextField
      id="text-field-1"
      type="text"
      bind:textFieldValue
      labelText="Text field"
      accessiblePlaceholder
      onInput={(textFieldValue) => console.log("Input user value: ", textFieldValue)}
      onChange={(textFieldValue)=>console.log("Displays what user is typing every time they hit the return key: ",textFieldValue)}
    />`}
  >
    <ONSTextField
      id="text-field-1"
      type="text"
      bind:textFieldValue
      labelText="Text field"
      accessiblePlaceholder
      onInput={(textFieldValue) => console.log("Input user value: ", textFieldValue)}
      onChange={(textFieldValue) =>
        console.log("Displays what user is typing every time they hit the return key: ", textFieldValue)}
    />
  </DesignSystemPanel>
  <p>You are typing: {textFieldValue}</p>

  <DesignSystemPanel
    title="Input-error message"
    code={`<ONSTextField
      id="text-field-2"
      type="text"
      bind:textFieldValue={inputErrorValue}
      labelText="Text field"
      renderError
      onInput={(inputErrorValue) => console.log("Input user value: ", inputErrorValue)}
      onChange={(textFieldValue)=>console.log("Displays what user is typing every time they hit the return key: ",textFieldValue)}
    />`}
  >
    <ONSTextField
      id="text-field-2"
      type="text"
      bind:textFieldValue={inputErrorValue}
      labelText="Text field"
      renderError
      onInput={(inputErrorValue) => console.log("Input user value: ", inputErrorValue)}
      onChange={(textFieldValue) =>
        console.log("Displays what user is typing every time they hit the return key: ", textFieldValue)}
    />
  </DesignSystemPanel>
  <p>You are typing: {inputErrorValue}</p>

  <DesignSystemPanel
    title="Select"
    code={`<ONSSelect
    label="Select city"
    options={[
      { value: "london", label: "London" },
      { value: "bristol", label: "Bristol", selected: true },
      { value: "oxford", label: "Oxford", disabled: true },
    ]}
  />`}
  >
    <ONSSelect
      label="Select city"
      options={[
        { value: "london", label: "London" },
        { value: "bristol", label: "Bristol", selected: true },
        { value: "oxford", label: "Oxford", disabled: true },
      ]}
    />
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Text area"
    code={`<ONSTextArea id="text-area" hint="this is a hint for text area">Text area</ONSTextArea>`}
  >
    <ONSTextArea
      id="text-area"
      labelText="Text area"
      hint="this is a hint for text area"
      placeholderText="enter your placeholder text..."
      onChange={(textAreaValue) =>
        console.log("Displays what user is typing every time they click outside of the text area box: ", textAreaValue)}
      onInput={(textAreaValue) => console.log("Text area user value: ", textAreaValue)}
    />
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Radios"
    code={`  <ONSRadios name="ethnicity">
    <ONSRadio id="asian">Asian</ONSRadio>
    <ONSRadio id="black">Black</ONSRadio>
    <ONSRadio id="mixed">Mixed</ONSRadio>
    <ONSRadio id="white">White</ONSRadio>
    <ONSRadio id="other">Other</ONSRadio> 
    </ONSRadios>`}
  >
    <ONSRadios name="ethnicity">
      <ONSRadio id="asian">Asian</ONSRadio>
      <ONSRadio id="black">Black</ONSRadio>
      <ONSRadio id="mixed">Mixed</ONSRadio>
      <ONSRadio id="white">White</ONSRadio>
      <ONSRadio id="other">Other</ONSRadio>
    </ONSRadios>
  </DesignSystemPanel>
  <DesignSystemPanel
    title="Accordion"
    code={` <ONSAccordion showAll={false}>
    <ONSAccordionPanel id="panel-1" title="Total retail turnover"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio aliquid facere vel facilis in necessitatibus
      magni sequi unde, ad rerum praesentium, deserunt quo saepe dolore, accusantium fuga quia tenetur sed.</ONSAccordionPanel
    >
    <ONSAccordionPanel id="panel-2" title="Food sales"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio aliquid facere vel facilis in necessitatibus
      magni sequi unde, ad rerum praesentium, deserunt quo saepe dolore, accusantium fuga quia tenetur sed.</ONSAccordionPanel
    >
  </ONSAccordion>/>`}
  >
    <ONSAccordion showAll={false}>
      <ONSAccordionPanel id="panel-1" title="Total retail turnover"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio aliquid facere vel facilis in
        necessitatibus magni sequi unde, ad rerum praesentium, deserunt quo saepe dolore, accusantium fuga quia tenetur
        sed.</ONSAccordionPanel
      >
      <ONSAccordionPanel id="panel-2" title="Food sales"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio aliquid facere vel facilis in
        necessitatibus magni sequi unde, ad rerum praesentium, deserunt quo saepe dolore, accusantium fuga quia tenetur
        sed.</ONSAccordionPanel
      >
    </ONSAccordion>
  </DesignSystemPanel>

  <DesignSystemPanel title="Share" code={`<ONSShare url="https://www.google.com/">Share this page</ONSShare>`}>
    <ONSShare url="https://www.google.com/">Share this page</ONSShare>
  </DesignSystemPanel>

  <DesignSystemPanel title="Feedback" code={`<Feedback />`}>
    <Feedback />
  </DesignSystemPanel>
</ONSCensusApp>

<style lang="scss">
  @import "../../node_modules/@ons/design-system/scss/vars/_index.scss";

  h2 {
    margin-top: 32px;
  }
</style>
