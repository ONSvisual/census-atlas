import MockGeographyService from "./services/mockGeographyService";
import {getLadAndLsoa, initialiseGeography, loadingGeography, reset} from "./geography";

describe("initialise geography", () => {
  it("calls functions from the geography service", async () => {
    // given
    // a mock for the geography service
    const mockGeographyService = new MockGeographyService([], []);

    // when
    // we call initialise geography
    await initialiseGeography(mockGeographyService);

    // then
    // it calls functions on the geography service
    expect(mockGeographyService.getLadListCalled).toBe(1);
    expect(mockGeographyService.getLsoaDataCalled).toBe(1);
  });

  it("switches geographyLoading to true and back again", async () => {
    // given
    // we reset
    reset();
    const mockGeographyService = new MockGeographyService([], []);

    // and record a change history for loadingGeography
    var changeHistory = [];
    loadingGeography.subscribe((value) => {
      changeHistory.push(value);
    });

    // when
    // we call initialise geography
    await initialiseGeography(mockGeographyService);

    // then
    // it will have switched loading from false to true and back again
    expect(changeHistory).toStrictEqual([false, true, false]);
  });

  it("loads a list of lads from the data service", async () => {

  })

  it("loads a list of lsoas from data service", async () => {

  })

  it("creates a lookup for lad info keyed by code", async () => {

  })

  it("creates a lookup for lsoa info keyed by code", async () => {

  })
});


describe("getLadAndLsoa", () => {
  const ladData = [
    {code:'barnet', name: 'Barnet'},
    {code:'voh', name: 'Vale of Horse'}
  ]
  const lsoaData = [
    {code:'barnet1', name: 'Hendon', parent: 'barnet'},
    {code:'voh1', name: 'Frogham', parent: 'voh'},
  ]
  
  beforeEach(() => {
    reset()
    initialiseGeography(new MockGeographyService(ladData,lsoaData))
  })
  
  it("returns both lsoa code and lad code if geography code is for lsoa", async () => {
    // given
    // a code for an lsoa
    let lsoaCode = 'barnet1'
    
    // when
    // 
    let result = getLadAndLsoa(lsoaCode)
    
    // then
    //
    expect(result).toStrictEqual({
      lad: 'barnet',
      lsoa: 'barnet1'
    })
  })
  
  it("returns null for lsoa if geography code is for lad", async () => {
    // given
    // a code for an lad
    let ladCode = 'barnet'

    // when
    // 
    let result = getLadAndLsoa(ladCode)

    // then
    //
    expect(result).toStrictEqual({
      lad: 'barnet',
      lsoa: null
    })
  })
  
  it("returns null for lad and lsoa if geography code is null", async () => {
    // given
    // a code for an lad
    let code = null;
    
    // when
    // 
    let result = getLadAndLsoa(code);

    // then
    //
    expect(result).toStrictEqual({
      lad: null,
      lsoa: null
    })
  })
})

describe("selected geography", () => {
  it("is initialised as writable object with null codes for lad and lsoa", async () => {

  })
  
  it("is updated to an lad with an action", async () => {

  })
  
  it("is updated to an lsoa with an action", async () => {

  })

  it("is deselected with a null code", async () => {

  })
})

describe("hovered geography", () => {
  it("is initialised as writable object with null codes for lad and lsoa", async () => {

  })

  it("is updated to an lad with an action", async () => {

  })

  it("is updated to an lsoa with an action", async () => {

  })

  it("is deselected with a null code", async () => {

  })
})

describe("zoom", () => {
  it("initialises to default", async () => {

  })

  it("is updated by updateZoom action", async () => {

  })
})
