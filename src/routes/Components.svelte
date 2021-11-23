<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import Map from "../ui/map/Map.svelte";
  import TopicExplorer from "../ui/TopicExplorer.svelte";
  import BasePage from "../ui/BasePage.svelte";
  import DesignSystemPanel from "../ui/DesignSystemPanel.svelte";
  import CategorySelector from "../ui/CategorySelector.svelte";
  import ExploreByAreaComponent from "../ui/ExploreByAreaComponent.svelte";
  import ExploreByTopic from "../ui/ExploreByTopic.svelte";
  import Feedback from "../ui/Feedback.svelte";
  import Topic from "../ui/Topic.svelte";
  import UseCensusData from "../ui/UseCensusData.svelte";
  import DesignSystemCode from "../ui/DesignSystemCode.svelte";
  import CensusTableByLocation from "../ui/CensusTableByLocation.svelte";
  import DefaultHeader from "../ui/DefaultHeader.svelte";
  import HeaderData3 from "../ui/HeaderData3.svelte";
  import DataHeader from "../ui/DataHeader.svelte";
  import ONSShare from "../ui/ons/ONSShare.svelte";
  import ONSShareItem from "../ui/ons/partials/ONSShareItem.svelte";
  import ONSFacebookIcon from "../ui/ons/svg/ONSFacebookIcon.svelte";
  import ONSTwitterIcon from "../ui/ons/svg/ONSTwitterIcon.svelte";
  import ONSLinkedinIcon from "../ui/ons/svg/ONSLinkedinIcon.svelte";
  import ONSEmailIcon from "../ui/ons/svg/ONSEmailIcon.svelte";

  let topicList1 = [
    { title: "How does general health differ across England and Wales?", href: "#" },
    { title: "Which areas are home to people who provide the most unpaid care?", href: "#" },
    { title: "What can we learn about long-term health issues and/or disability?", href: "#" },
  ];
  let topicList2 = [{ title: "Get Census datasests", href: "#" }];
  let serviceTitle = "Census Atlas components";
  let description = "Complex components made in Svelte with ONS Design System building blocks";
  var selectedData = writable();
  setContext("selectedData", selectedData);
</script>

<svelte:head>
  <script defer src="/build/ons-design-system.js"></script>
</svelte:head>

<BasePage {serviceTitle} {description}>
  <DesignSystemPanel
    title="Default header"
    code={`<DefaultHeader serviceTitle="Explore Census" description="Here's a place where we tell users what the Census Atlas is and what it can do for them."/>`}
  >
    <DefaultHeader
      serviceTitle="Explore Census"
      description="Here's a place where we tell users what the Census Atlas is and what it can do for them."
    />
  </DesignSystemPanel>

  <DesignSystemPanel title="By category header" code={`<DataHeader tableName="General Health"/>`}>
    <DataHeader tableName="General Health" />
  </DesignSystemPanel>

  <DesignSystemPanel title="By location header" code={`<DataHeader location="Walsall"/>`}>
    <DataHeader location="Walsall" />
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Data header 3"
    code={`<HeaderData3
    serviceTitle="Choose a data option"
    description="Choose a category and select an option within it to explore Census data."
  />`}
  >
    <HeaderData3
      serviceTitle="Choose a data option"
      description="Choose a category and select an option within it to explore Census data."
    />
  </DesignSystemPanel>
  <DesignSystemPanel title="Category selector" code={`<CategorySelector />`}>
    <CategorySelector />
  </DesignSystemPanel>
  <DesignSystemPanel title="Explore by area" code={`<ExploreByAreaComponent />`}>
    <ExploreByAreaComponent />
  </DesignSystemPanel>
  <DesignSystemPanel title="Explore by topic" code={`<ExploreByTopic />`}>
    <ExploreByTopic />
  </DesignSystemPanel>
  <DesignSystemPanel title="Feedback" code={`<Feedback />`}>
    <Feedback />
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Topic component-1"
    code={`<Topic topicList={topicList1} cardTitle="Health - Census 2021">
  The 2021 Census tells us a lot about the health of people living in England and Wales live and. 
  <a href="#">Choose a data option from the full list</a> or explore one of these suggestions.
</Topic>`}
  >
    <Topic topicList={topicList1} cardTitle="Health - Census 2021"
      >The 2021 Census tells us a lot about the health of people living in England and Wales live and. <a href="#">
        Choose a data option from the full list</a
      > or explore one of these suggestions.
    </Topic>
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Topic component-2"
    code={`<Topic topicList={topicList2} cardTitle="Need something specific from Census?">
    Explore correlations between two indicators in <a href="#">advanced mode</a>.
  </Topic>`}
  >
    <Topic topicList={topicList2} cardTitle="Need something specific from Census?"
      >Explore correlations between two indicators in <a href="#">advanced mode</a>.
    </Topic>
  </DesignSystemPanel>

  <DesignSystemPanel
    title="Topic component-3"
    code={`<Topic cardTitle="General health with other indicators"
    >Explore correlations between two indicators in <a href="#">advanced mode</a>.</Topic
  >`}
  >
    <Topic cardTitle="General health with other indicators"
      >Explore correlations between two indicators in <a href="#">advanced mode</a>.
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
  <DesignSystemPanel title="Display census data by location" code={`<CensusTableByLocation />`}>
    <CensusTableByLocation />
  </DesignSystemPanel>

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
</BasePage>
