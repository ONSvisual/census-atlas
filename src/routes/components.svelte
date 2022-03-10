<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  import Map from "./../ui/map/Map.svelte";
  import TopicExplorer from "./../ui/TopicExplorer.svelte";
  import BasePage from "./../ui/BasePage.svelte";
  import DesignSystemPanel from "./../ui/DesignSystemPanel.svelte";
  import CategorySelector from "./../ui/CategorySelector/CategorySelector.svelte";
  import SearchByAreaComponent from "./../ui/SearchByAreaComponent.svelte";
  import SelectTopic from "./../ui/SelectTopic.svelte";
  import Feedback from "./../ui/Feedback.svelte";
  import Topic from "./../ui/Topic.svelte";
  import UseCensusData from "./../ui/UseCensusData.svelte";
  import DesignSystemCode from "./../ui/DesignSystemCode.svelte";
  import CensusTableByLocation from "./../ui/CensusTableByLocation.svelte";
  import Header from "./../ui/Header.svelte";
  import DataHeader from "./../ui/DataHeader.svelte";
  import ONSShare from "./../ui/ons/ONSShare.svelte";
  import ONSShareItem from "./../ui/ons/partials/ONSShareItem.svelte";
  import ONSFacebookIcon from "./../ui/ons/svg/ONSFacebookIcon.svelte";
  import ONSTwitterIcon from "./../ui/ons/svg/ONSTwitterIcon.svelte";
  import ONSLinkedinIcon from "./../ui/ons/svg/ONSLinkedinIcon.svelte";
  import ONSEmailIcon from "./../ui/ons/svg/ONSEmailIcon.svelte";
  import config from "../config";
  import DataComparison from "./../ui/DataComparison/DataComparison.svelte";

  let topicList1 = [
    {
      text: "How does general health differ across England and Wales?",
      url: "#0",
    },
    {
      text: "Which areas are home to people who provide the most unpaid care?",
      url: "#0",
    },
  ];
  let topicList2 = [{ text: "Get Census datasests", url: "#0" }];
  let serviceTitle = "Census Atlas components";
  let description = "Complex components made in Svelte with ONS Design System building blocks";
  var selectedData = writable();
  setContext("selectedData", selectedData);

  let mapLocation = "Walsall";

  let categories = [
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
  let selectedCode = "QS302EW002";
</script>

<svelte:head>
  <title>2021 Census Data Atlas Components</title>
</svelte:head>

<BasePage {serviceTitle} {description}>
  <DesignSystemPanel
    title="Default header"
    code={`<Header
      serviceTitle="Explore Census"
      description="Use our interactive map to find out what people's lives are like across England and Wales."
    />`}
  >
    <Header
      serviceTitle="Explore Census"
      description="Use our interactive map to find out what people's lives are like across England and Wales."
    />
  </DesignSystemPanel>

  <DesignSystemPanel title="By category header" code={`<DataHeader tableName="General Health"/>`}>
    <DataHeader tableName="General Health" />
  </DesignSystemPanel>

  <DesignSystemPanel title="By location header" code={`<DataHeader location={mapLocation}/>`}>
    <DataHeader location={mapLocation} />
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Choose a category header"
    code={`<Header
      showBackLink
      serviceTitle="Choose a category"
      description="Choose a category and select an option within it to explore {false?'\${mapLocation}'s':'Census'} data."
    />`}
  >
    <Header
      showBackLink
      serviceTitle="Choose a category"
      description="Choose a category and select an option within it to explore {false
        ? `${mapLocation}'s`
        : 'Census'} data."
    />
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Choose a category header when there is a location"
    code={`<Header
      showBackLink
      serviceTitle="Choose a category"
      description="Choose a category and select an option within it to explore {true?'\${mapLocation}'s':'Census'} data."
    />`}
  >
    <Header
      showBackLink
      serviceTitle="Choose a category"
      description="Choose a category and select an option within it to explore {true
        ? `${mapLocation}'s`
        : 'Census'} data."
    />
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Choose an area header"
    code={`<Header showBackLink serviceTitle="Choose an area"><SearchByAreaComponent header /></Header>`}
  >
    <Header showBackLink serviceTitle="Choose an area"><SearchByAreaComponent header /></Header>
  </DesignSystemPanel>

  <DesignSystemPanel title="Category selector" code={`<CategorySelector {categories} {selectedCode} />`}>
    <CategorySelector {categories} {selectedCode} />
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Explore by area"
    code={`<SearchByAreaComponent >Search for an area to find out how it compares to others</SearchByAreaComponent>`}
  >
    <SearchByAreaComponent>Search for an area to find out how it compares to others</SearchByAreaComponent>
  </DesignSystemPanel>
  <DesignSystemPanel title="Select a topic" code={`<SelectTopic />`}>
    <SelectTopic />
  </DesignSystemPanel>
  <DesignSystemPanel title="Feedback" code={`<Feedback />`}>
    <Feedback />
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Topic component-1"
    code={`<Topic topicList={topicList1} cardTitle="Health - Census 2021">
  The 2021 Census tells us a lot about the health of people living in England and Wales live and. 
  <a href="#0">Choose a category from the full list</a> or explore one of these suggestions.
</Topic>`}
  >
    <Topic topicList={topicList1} cardTitle="Health - Census 2021"
      >The 2021 Census tells us a lot about the health of people living in England and Wales live and. <a href="#0">
        Choose a category from the full list</a
      > or explore one of these suggestions.
    </Topic>
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Topic component-2"
    code={`<Topic topicList={topicList2} cardTitle="Need something specific from Census?">
    Explore correlations between two indicators in <a href="#0">advanced mode</a>.
  </Topic>`}
  >
    <Topic topicList={topicList2} cardTitle="Need something specific from Census?"
      >Explore correlations between two indicators in <a href="#0">advanced mode</a>.
    </Topic>
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Topic component-3"
    code={`<Topic cardTitle="General health with other indicators"
    >Explore correlations between two indicators in <a href="#0">advanced mode</a>.</Topic
  >`}
  >
    <Topic cardTitle="General health with other indicators"
      >Explore correlations between two indicators in <a href="#0">advanced mode</a>.
    </Topic>
  </DesignSystemPanel>
  <DesignSystemPanel title="Use census data" code={`<UseCensusData />`}>
    <UseCensusData />
  </DesignSystemPanel>
  <DesignSystemPanel title="Map placeholder" code={`<Map />`}><Map /></DesignSystemPanel>
  <DesignSystemPanel title="Topic explorer" code={`<TopicExplorer />`}><TopicExplorer /></DesignSystemPanel>
  <DesignSystemPanel title="Design system code block">
    <DesignSystemCode code={`<DesignSystemCode code={\`<App />\`} />`} />
  </DesignSystemPanel>
  <!-- <DesignSystemPanel title="Display census data by location" code={`<CensusTableByLocation />`}>
    <CensusTableByLocation />
  </DesignSystemPanel> -->

  <DesignSystemPanel
    title="Share"
    code={`<ONSShare title="Share this page" censusAtlasSharePage pageURL={location.href} pageTitle={document.title}>
      <ONSShareItem facebook shareText="Facebook"><ONSFacebookIcon /></ONSShareItem>
      <ONSShareItem twitter shareText="Twitter"><ONSTwitterIcon /></ONSShareItem>
      <ONSShareItem linkedin shareText="Linkedin"><ONSLinkedinIcon /></ONSShareItem>
      <ONSShareItem email shareText="Email"><ONSEmailIcon /></ONSShareItem>
    </ONSShare>`}
  >
    <ONSShare title="Share this page" pageURL={location.href} pageTitle={document.title} multiRow>
      <ONSShareItem facebook shareText="Facebook"><ONSFacebookIcon /></ONSShareItem>
      <ONSShareItem twitter shareText="Twitter"><ONSTwitterIcon /></ONSShareItem>
      <ONSShareItem linkedin shareText="Linkedin"><ONSLinkedinIcon /></ONSShareItem>
      <ONSShareItem email shareText="Email"><ONSEmailIcon /></ONSShareItem>
    </ONSShare>
  </DesignSystemPanel>

  <DesignSystemPanel>
    <DataComparison />
  </DesignSystemPanel>
</BasePage>
