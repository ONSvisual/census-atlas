export default [
  {
    code: "Education",
    name: "Education",
    slug: "education",
    desc: "Residents in education and qualifications they hold.",
    tables: [
      {
        code: "QS501EW",
        name: "Highest level of qualification gained",
        slug: "highest-level-of-qualification-gained",
        desc: "Highest qualification gained by residents.",
        categories: [
          {
            code: "QS501EW0002",
            name: "No qualifications",
            slug: "no-qualifications",
          },
          {
            code: "QS501EW0003",
            name: "Level 1 qualifications",
            slug: "level-1-qualifications",
          },
          {
            code: "QS501EW0004",
            name: "Level 2 qualifications",
            slug: "level-2-qualifications",
          },
          {
            code: "QS501EW0006",
            name: "Level 3 qualifications",
            slug: "level-3-qualifications",
          },
          {
            code: "QS501EW0007",
            name: "Level 4 qualifications and above",
            slug: "level-4-qualifications-and-above",
          },
          {
            code: "QS501EW0005",
            name: "Apprenticeship",
            slug: "apprenticeship",
          },
          {
            code: "QS501EW0008",
            name: "Other qualifications",
            slug: "other-qualifications",
          },
        ],
        units: "People",
        total: {
          code: "QS501EW0001",
          name: "All categories: Highest level of qualification",
          slug: "all-categories-highest-level-of-qualification",
        },
      },
    ],
  },
  {
    code: "Health",
    name: "Health",
    slug: "health",
    desc: "General health and caring responsibilities.",
    tables: [
      {
        code: "QS302EW",
        name: "General health",
        slug: "general-health",
        desc: "How people rate their general health.",
        categories: [
          {
            code: "QS302EW0002",
            name: "Very good",
            slug: "very-good",
          },
          {
            code: "QS302EW0003",
            name: "Good",
            slug: "good",
          },
          {
            code: "QS302EW0004",
            name: "Fair",
            slug: "fair",
          },
          {
            code: "QS302EW0005",
            name: "Bad",
            slug: "bad",
          },
          {
            code: "QS302EW0006",
            name: "Very bad",
            slug: "very-bad",
          },
        ],
        units: "People",
        total: {
          code: "QS302EW0001",
          name: "All categories: General health",
          slug: "all-categories-general-health",
        },
      },
      {
        code: "QS303EW",
        name: "Long-term conditions",
        slug: "long-term-conditions",
        desc: "How people's heath affect their day-to-day activities.",
        categories: [
          {
            code: "QS303EW0004",
            name: "No long-term condition",
            slug: "no-long-term-condition",
          },
          {
            code: "QS303EW0003",
            name: "Day-to-day activities limited a little",
            slug: "day-to-day-activities-limited-a-little",
          },
          {
            code: "QS303EW0002",
            name: "Day-to-day activities limited a lot",
            slug: "day-to-day-activities-limited-a-lot",
          },
        ],
        units: "People",
        total: {
          code: "QS303EW0001",
          name: "All categories: Long-term health problem or disability",
          slug: "all-categories-long-term-health-problem-or-disability",
        },
      },
      {
        code: "QS301EW",
        name: "Unpaid care",
        slug: "unpaid-care",
        desc: "People who provide unpaid care.",
        categories: [
          {
            code: "QS301EW0002",
            name: "Does not provide unpaid care",
            slug: "does-not-provide-unpaid-care",
          },
          {
            code: "QS301EW0003",
            name: "Provides 1 to 19 hours unpaid care a week",
            slug: "provides-1-to-19-hours-unpaid-care-a-week",
          },
          {
            code: "QS301EW0004",
            name: "Provides 20 to 49 hours unpaid care a week",
            slug: "provides-20-to-49-hours-unpaid-care-a-week",
          },
          {
            code: "QS301EW0005",
            name: "Provides 50 or more hours unpaid care a week",
            slug: "provides-50-or-more-hours-unpaid-care-a-week",
          },
        ],
        units: "People",
        total: {
          code: "QS301EW0001",
          name: "All categories: Provision of unpaid care",
          slug: "all-categories-provision-of-unpaid-care",
        },
      },
    ],
  },
  {
    code: "Housing",
    name: "Housing",
    slug: "housing",
    desc: "Types of homes and the people living in them.",
    tables: [
      {
        code: "QS406EW",
        name: "Size of household",
        slug: "size-of-household",
        desc: "People living in the same home.",
        categories: [
          {
            code: "QS406EW0002",
            name: "1 person household",
            slug: "1-person-household",
          },
          {
            code: "QS406EW0003",
            name: "2 person household",
            slug: "2-person-household",
          },
          {
            code: "QS406EW0004",
            name: "3 person household",
            slug: "3-person-household",
          },
          {
            code: "QS406EW0005",
            name: "4 person household",
            slug: "4-person-household",
          },
          {
            code: "QS406EW0006",
            name: "5 person household",
            slug: "5-person-household",
          },
        ],
        units: "Households",
        total: {
          code: "QS406EW0001",
          name: "All categories: Household size",
          slug: "all-categories-household-size",
        },
      },
      {
        code: "QS402EW",
        name: "Type of home",
        slug: "type-of-home",
        desc: "Types of homes people live in.",
        categories: [
          {
            code: "QS402EW0003",
            name: "Whole house or bungalow",
            slug: "whole-house-or-bungalow",
          },
          {
            code: "QS402EW0004",
            name: "Detached",
            slug: "detached",
          },
          {
            code: "QS402EW0005",
            name: "Semi-detatched",
            slug: "semi-detatched",
          },
          {
            code: "QS402EW0006",
            name: "Terraced (including end of terrace)",
            slug: "terraced-including-end-of-terrace",
          },
          {
            code: "QS402EW0007",
            name: "Flat, maisonette or apartment",
            slug: "flat-maisonette-or-apartment",
          },
          {
            code: "QS402EW0008",
            name: "Purpose-built block of flats or tenement",
            slug: "purpose-built-block-of-flats-or-tenement",
          },
          {
            code: "QS402EW0009",
            name: "Part of a converted or shared house (including bedsits)",
            slug: "part-of-a-converted-or-shared-house-including-bedsits",
          },
          {
            code: "QS402EW0010",
            name: "Commercial building",
            slug: "commercial-building",
          },
          {
            code: "QS402EW0011",
            name: "Caravan",
            slug: "caravan",
          },
          {
            code: "QS402EW0012",
            name: "Shared home",
            slug: "shared-home",
          },
        ],
        units: "Households",
        total: {
          code: "QS402EW0001",
          name: "All categories: Accommodation type",
          slug: "all-categories-accommodation-type",
        },
      },
      {
        code: "QS411EW",
        name: "Number of bedrooms",
        slug: "number-of-bedrooms",
        desc: "",
        categories: [
          {
            code: "QS411EW0002",
            name: "No dedicated bedroom",
            slug: "no-dedicated-bedroom",
          },
          {
            code: "QS411EW0003",
            name: "1 bedroom",
            slug: "1-bedroom",
          },
          {
            code: "QS411EW0004",
            name: "2 bedrooms",
            slug: "2-bedrooms",
          },
          {
            code: "QS411EW0005",
            name: "3 bedrooms",
            slug: "3-bedrooms",
          },
          {
            code: "QS411EW0006",
            name: "4 bedrooms",
            slug: "4-bedrooms",
          },
          {
            code: "QS411EW0007",
            name: "5 or more bedrooms",
            slug: "5-or-more-bedrooms",
          },
        ],
        units: "Households",
        total: {
          code: "QS411EW0001",
          name: "All categories: Number of bedrooms",
          slug: "all-categories-number-of-bedrooms",
        },
      },
      {
        code: "QS403EW",
        name: "Owned or renting",
        slug: "owned-or-renting",
        desc: "People that live in a home they rent or own.",
        categories: [
          {
            code: "QS403EW0002",
            name: "Owned",
            slug: "owned",
          },
          {
            code: "QS403EW0003",
            name: "Owned outright",
            slug: "owned-outright",
          },
          {
            code: "QS403EW0004",
            name: "Owned with a mortgage or a loan",
            slug: "owned-with-a-mortgage-or-a-loan",
          },
          {
            code: "QS403EW0005",
            name: "Shared ownership",
            slug: "shared-ownership",
          },
          {
            code: "QS403EW0006",
            name: "Social rent",
            slug: "social-rent",
          },
          {
            code: "QS403EW0007",
            name: "Rented from council (Local Authority)",
            slug: "rented-from-council-local-authority",
          },
          {
            code: "QS403EW0008",
            name: "Other social rented",
            slug: "other-social-rented",
          },
          {
            code: "QS403EW0009",
            name: "Private rented",
            slug: "private-rented",
          },
          {
            code: "QS403EW0010",
            name: "Private landlord or letting agency",
            slug: "private-landlord-or-letting-agency",
          },
          {
            code: "QS403EW0011",
            name: "Employer of a household member",
            slug: "employer-of-a-household-member",
          },
          {
            code: "QS403EW0012",
            name: "Relative or friend of household member",
            slug: "relative-or-friend-of-household-member",
          },
          {
            code: "QS403EW0013",
            name: "Other private rented",
            slug: "other-private-rented",
          },
        ],
        units: "People",
        total: {
          code: "QS403EW0001",
          name: "All categories: Tenure",
          slug: "all-categories-tenure",
        },
      },
      {
        code: "QS416EW",
        name: "Car or van availability",
        slug: "car-or-van-availability",
        desc: "People that have access to cars or vans.",
        categories: [
          {
            code: "QS416EW0002",
            name: "No cars or vans available",
            slug: "no-cars-or-vans-available",
          },
          {
            code: "QS416EW0003",
            name: "1 car or van",
            slug: "1-car-or-van",
          },
          {
            code: "QS416EW0004",
            name: "2 cars or vans",
            slug: "2-cars-or-vans",
          },
        ],
        units: "Households",
        total: {
          code: "QS416EW0001",
          name: "All categories: Car or van availability",
          slug: "all-categories-car-or-van-availability",
        },
      },
      {
        code: "QS415EW",
        name: "Heating",
        slug: "heating",
        desc: "Types of central heating",
        categories: [
          {
            code: "QS415EW0002",
            name: "No central heating",
            slug: "no-central-heating",
          },
          {
            code: "QS415EW0003",
            name: "Gas",
            slug: "gas",
          },
          {
            code: "QS415EW0004",
            name: "Electric (including storage heaters)",
            slug: "electric-including-storage-heaters",
          },
          {
            code: "QS415EW0005",
            name: "Oil",
            slug: "oil",
          },
          {
            code: "QS415EW0006",
            name: "Solid fuel (for example wood, coal)",
            slug: "solid-fuel-for-example-wood-coal",
          },
          {
            code: "QS415EW0007",
            name: "Other central heating",
            slug: "other-central-heating",
          },
          {
            code: "QS415EW0008",
            name: "Two or more types of central heating",
            slug: "two-or-more-types-of-central-heating",
          },
        ],
        units: "Households",
        total: {
          code: "QS415EW0001",
          name: "All categories: Type of central heating in household",
          slug: "all-categories-type-of-central-heating-in-household",
        },
      },
      {
        code: "QS101EW",
        name: "Residence type",
        slug: "residence-type",
        desc: "Families and other groups living in the same home or communal establishment.",
        categories: [
          {
            code: "QS101EW0002",
            name: "Lives in a household",
            slug: "lives-in-a-household",
          },
          {
            code: "QS101EW0003",
            name: "Lives in a communal establishment",
            slug: "lives-in-a-communal-establishment",
          },
        ],
        units: "People",
        total: {
          code: "QS101EW0001",
          name: "All categories: Residence type",
          slug: "all-categories-residence-type",
        },
      },
    ],
  },
  {
    code: "Identity",
    name: "Identity",
    slug: "identity",
    desc: "How residents identify themselves and their beliefs.",
    tables: [
      {
        code: "QS201EW",
        name: "Ethnicity",
        slug: "ethnicity",
        desc: "How people identify the ethnic group they belong to.",
        categories: [
          {
            code: "QS201EW0010",
            name: "Indian",
            slug: "indian",
          },
          {
            code: "QS201EW0011",
            name: "Pakistani",
            slug: "pakistani",
          },
          {
            code: "QS201EW0012",
            name: "Bangladeshi",
            slug: "bangladeshi",
          },
          {
            code: "QS201EW0013",
            name: "Chinese",
            slug: "chinese",
          },
          {
            code: "QS201EW0014",
            name: "Other Asian",
            slug: "other-asian",
          },
          {
            code: "QS201EW0015",
            name: "African",
            slug: "african",
          },
          {
            code: "QS201EW0016",
            name: "Caribbean",
            slug: "caribbean",
          },
          {
            code: "QS201EW0017",
            name: "Other black",
            slug: "other-black",
          },
          {
            code: "QS201EW0006",
            name: "White and Black Caribbean",
            slug: "white-and-black-caribbean",
          },
          {
            code: "QS201EW0007",
            name: "White and Black African",
            slug: "white-and-black-african",
          },
          {
            code: "QS201EW0008",
            name: "White and Asian",
            slug: "white-and-asian",
          },
          {
            code: "QS201EW0009",
            name: "Other mixed",
            slug: "other-mixed",
          },
          {
            code: "QS201EW0002",
            name: "English/Welsh/Scottish/Northern Irish/British",
            slug: "english-welsh-scottish-northern-irish-british",
          },
          {
            code: "QS201EW0003",
            name: "Irish",
            slug: "irish",
          },
          {
            code: "QS201EW0004",
            name: "Gypsy or Irish Traveller",
            slug: "gypsy-or-irish-traveller",
          },
          {
            code: "QS201EW0005",
            name: "Other white",
            slug: "other-white",
          },
          {
            code: "QS201EW0018",
            name: "Arab",
            slug: "arab",
          },
          {
            code: "QS201EW0019",
            name: "Any other ethnic group",
            slug: "any-other-ethnic-group",
          },
        ],
        units: "People",
        total: {
          code: "QS201EW0001",
          name: "All categories: Ethnic group",
          slug: "all-categories-ethnic-group",
        },
      },
      {
        code: "QS202EW",
        name: "Ethnic groups living together",
        slug: "ethnic-groups-living-together",
        desc: "The mix of ethnic groups in a single household.",
        categories: [
          {
            code: "QS202EW0003",
            name: "All household members have the same ethnic group",
            slug: "all-household-members-have-the-same-ethnic-group",
          },
          {
            code: "QS202EW0004",
            name: "Different ethnic groups between the generations only",
            slug: "different-ethnic-groups-between-the-generations-only",
          },
          {
            code: "QS202EW0005",
            name: "Different ethnic groups within partnerships",
            slug: "different-ethnic-groups-within-partnerships",
          },
          {
            code: "QS202EW0006",
            name: "Any other combination of multiple ethnic groups",
            slug: "any-other-combination-of-multiple-ethnic-groups",
          },
        ],
        units: "Households",
        total: {
          code: "QS202EW0001",
          name: "All categories: Multiple ethnic groups",
          slug: "all-categories-multiple-ethnic-groups",
        },
      },
      {
        code: "QS208EW",
        name: "Religion and beliefs",
        slug: "religion-and-beliefs",
        desc: "People's religion and beliefs.",
        categories: [
          {
            code: "QS208EW0009",
            name: "No religion",
            slug: "no-religion",
          },
          {
            code: "QS208EW0002",
            name: "Christian",
            slug: "christian",
          },
          {
            code: "QS208EW0003",
            name: "Buddhist",
            slug: "buddhist",
          },
          {
            code: "QS208EW0004",
            name: "Hindu",
            slug: "hindu",
          },
          {
            code: "QS208EW0005",
            name: "Jewish",
            slug: "jewish",
          },
          {
            code: "QS208EW0006",
            name: "Muslim",
            slug: "muslim",
          },
          {
            code: "QS208EW0007",
            name: "Sikh",
            slug: "sikh",
          },
          {
            code: "QS208EW0008",
            name: "Other religion",
            slug: "other-religion",
          },
          {
            code: "QS208EW0010",
            name: "Not stated",
            slug: "not-stated",
          },
        ],
        units: "People",
        total: {
          code: "QS208EW0001",
          name: "All categories: Religion",
          slug: "all-categories-religion",
        },
      },
      {
        code: "QS203EW",
        name: "Place of birth",
        slug: "place-of-birth",
        desc: "People born in or outside the UK.",
        categories: [
          {
            code: "QS203EW0003",
            name: "Europe, United Kingdom",
            slug: "europe-united-kingdom",
          },
          {
            code: "QS203EW0014",
            name: "Europe, Ireland",
            slug: "europe-ireland",
          },
          {
            code: "QS203EW0015",
            name: "Other Europe",
            slug: "other-europe",
          },
          {
            code: "QS203EW0032",
            name: "Africa",
            slug: "africa",
          },
          {
            code: "QS203EW0045",
            name: "Middle East and Asia",
            slug: "middle-east-and-asia",
          },
          {
            code: "QS203EW0063",
            name: "The Americas and the Caribbean",
            slug: "the-americas-and-the-caribbean",
          },
        ],
        units: "People",
        total: {
          code: "QS203EW0001",
          name: "All categories: Country of birth",
          slug: "all-categories-country-of-birth",
        },
      },
      {
        code: "KS207WA",
        name: "Understand, speak, read or write Welsh",
        slug: "understand-speak-read-or-write-welsh",
        desc: "People that speak, read or write Welsh.",
        categories: [
          {
            code: "KS207WA0003",
            name: "Can understand spoken Welsh only",
            slug: "can-understand-spoken-welsh-only",
          },
          {
            code: "KS207WA0007",
            name: "Can speak, read or write Welsh",
            slug: "can-speak-read-or-write-welsh",
          },
          {
            code: "KS207WA0002",
            name: "No Welsh skills",
            slug: "no-welsh-skills",
          },
        ],
        units: "People",
        total: {
          code: "KS207WA0001",
          name: "All usual residents aged 3 and over",
          slug: "all-usual-residents-aged-3-and-over",
        },
      },
      {
        code: "KS206EW",
        name: "Welsh or English language",
        slug: "welsh-or-english-language",
        desc: "People that speak Welsh or English in the home/household.",
        categories: [
          {
            code: "KS206EW0002",
            name: "All adults use English or Welsh at home",
            slug: "all-adults-use-english-or-welsh-at-home",
          },
          {
            code: "KS206EW0003",
            name: "At least one but not all adults use English or welsh at home",
            slug: "at-least-one-but-not-all-adults-use-english-or-welsh-at-home",
          },
          {
            code: "KS206EW0004",
            name: "At least one child uses English or Welsh at home, but no adults do",
            slug: "at-least-one-child-uses-english-or-welsh-at-home-but-no-adults-do",
          },
          {
            code: "KS206EW0005",
            name: "No-one uses English or Welsh at home",
            slug: "no-one-uses-english-or-welsh-at-home",
          },
        ],
        units: "Households",
        total: {
          code: "KS206EW0001",
          name: "All categories: English or Welsh as a household language",
          slug: "all-categories-english-or-welsh-as-a-household-language",
        },
      },
      {
        code: "QS119EW",
        name: "Household deprivation",
        slug: "household-deprivation",
        desc: "How deprived the households are in  [this area]",
        categories: [
          {
            code: "QS119EW0002",
            name: "Not deprived in any dimension",
            slug: "not-deprived-in-any-dimension",
          },
          {
            code: "QS119EW0003",
            name: "Deprived in 1 dimension",
            slug: "deprived-in-1-dimension",
          },
          {
            code: "QS119EW0004",
            name: "Deprived in 2 dimensions",
            slug: "deprived-in-2-dimensions",
          },
          {
            code: "QS119EW0005",
            name: "Deprived in 3 dimensions",
            slug: "deprived-in-3-dimensions",
          },
          {
            code: "QS119EW0006",
            name: "Deprived in 4 dimensions",
            slug: "deprived-in-4-dimensions",
          },
        ],
        units: "Households",
        total: {
          code: "QS119EW0001",
          name: "All categories: Classification of household deprivation",
          slug: "all-categories-classification-of-household-deprivation",
        },
      },
    ],
  },
  {
    code: "Population",
    name: "Population",
    slug: "population",
    desc: "Residents and their living arrangements.",
    tables: [
      {
        code: "QS104EW",
        name: "Sex",
        slug: "sex",
        desc: "The biological sex recorded by the person completing the census.",
        categories: [
          {
            code: "QS104EW0002",
            name: "Female",
            slug: "female",
          },
          {
            code: "QS104EW0003",
            name: "Male",
            slug: "male",
          },
        ],
        units: "People",
        total: {
          code: "QS104EW0001",
          name: "",
          slug: "",
        },
      },
      {
        code: "KS103EW",
        name: "Marital status",
        slug: "marital-status",
        desc: "People married or in civil partnerships.",
        categories: [
          {
            code: "KS103EW0002",
            name: "Single never married or in a civil partnership",
            slug: "single-never-married-or-in-a-civil-partnership",
          },
          {
            code: "KS103EW0003",
            name: "Married",
            slug: "married",
          },
          {
            code: "KS103EW0004",
            name: "In a registered civil partnership",
            slug: "in-a-registered-civil-partnership",
          },
          {
            code: "KS103EW0005",
            name: "Separated (but still legally married)",
            slug: "separated-but-still-legally-married",
          },
          {
            code: "KS103EW0006",
            name: "Divorced or civil partnership dissolved",
            slug: "divorced-or-civil-partnership-dissolved",
          },
          {
            code: "KS103EW0007",
            name: "Widowed or surviving civil partnership partner",
            slug: "widowed-or-surviving-civil-partnership-partner",
          },
        ],
        units: "People",
        total: {
          code: "KS103EW0001",
          name: "All categories: Marital and civil partnership status",
          slug: "all-categories-marital-and-civil-partnership-status",
        },
      },
      {
        code: "QS113EW",
        name: "Families living in the same home",
        slug: "families-living-in-the-same-home",
        desc: "Types of families living in the same home.",
        categories: [
          {
            code: "QS113EW0002",
            name: "One person households",
            slug: "one-person-households",
          },
          {
            code: "QS113EW0005",
            name: "Single family households",
            slug: "single-family-households",
          },
          {
            code: "QS113EW0006",
            name: "All people aged 65 and over",
            slug: "all-people-aged-65-and-over",
          },
          {
            code: "QS113EW0007",
            name: "Married couple",
            slug: "married-couple",
          },
          {
            code: "QS113EW0012",
            name: "Same-sex civil partnership couple",
            slug: "same-sex-civil-partnership-couple",
          },
          {
            code: "QS113EW0017",
            name: "Cohabiting couple",
            slug: "cohabiting-couple",
          },
          {
            code: "QS113EW0022",
            name: "Lone parent",
            slug: "lone-parent",
          },
        ],
        units: "Households",
        total: {
          code: "QS113EW0001",
          name: "All categories: Household composition",
          slug: "all-categories-household-composition",
        },
      },
      {
        code: "QS803EW",
        name: "Length of time people have lived in the UK",
        slug: "length-of-time-people-have-lived-in-the-uk",
        desc: "People born or have moved to the UK .",
        categories: [
          {
            code: "QS803EW0002",
            name: "Born in the UK",
            slug: "born-in-the-uk",
          },
          {
            code: "QS803EW0003",
            name: "Less than 2 years",
            slug: "less-than-2-years",
          },
          {
            code: "QS803EW0004",
            name: "2 to 4 years",
            slug: "2-to-4-years",
          },
          {
            code: "QS803EW0005",
            name: "5 to 9 years",
            slug: "5-to-9-years",
          },
          {
            code: "QS803EW0006",
            name: "10 years or more",
            slug: "10-years-or-more",
          },
        ],
        units: "People",
        total: {
          code: "QS803EW0001",
          name: "All categories: Length of residence in the UK",
          slug: "all-categories-length-of-residence-in-the-uk",
        },
      },
    ],
  },
];
