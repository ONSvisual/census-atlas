import Select from "./Select.svelte";
import { fireEvent, render } from "@testing-library/svelte";

describe("Select", () => {
  test("it renders", async () => {
    const { container } = render(Select);

    const selectElement = container.querySelector("#select");
    const toggleElement = container.querySelector("#toggle");
    const dropdownElement = container.querySelector("#dropdown");

    expect(selectElement).not.toBeNull();
    expect(toggleElement).not.toBeNull();
    expect(dropdownElement).toBeNull();
  });

  test("displays the placeholder when not selected", async () => {
    const { getByText } = render(Select, {
      selected: false,
    });

    const placeholder = getByText("Select an option");

    expect(placeholder).not.toBeNull();
  });

  test("displays custom placeholder text if it is provided", async () => {
    const testPlaceholder = "a test placeholder";
    const { getByText } = render(Select, {
      selected: false,
      placeholder: testPlaceholder,
    });

    const customPlaceholder = getByText(testPlaceholder);

    expect(customPlaceholder).not.toBeNull();
  });

  test("displays dropdown when the select clicked", async () => {
    const { container } = render(Select, { options: [] });

    const toggleElement = container.querySelector("#toggle");
    let dropdownElement = container.querySelector("#dropdown");

    expect(toggleElement).not.toBeNull();
    expect(dropdownElement).toBeNull();

    await fireEvent.click(toggleElement);

    dropdownElement = container.querySelector("#dropdown");

    expect(dropdownElement).not.toBeNull();
  });

  test('displays "No Results" in dropdown if no options provided', async () => {
    const { container, getByText } = render(Select, { options: [] });

    const toggleElement = container.querySelector("#toggle");
    expect(toggleElement).not.toBeNull();

    await fireEvent.click(toggleElement);

    const noResultsItem = getByText("No results");

    expect(noResultsItem).not.toBeNull();
  });

  test("displays each option provided in dropdown if no filter applied", async () => {
    const area1Name = "Area 1";
    const area2Name = "Area 2";
    const { container, getByText } = render(Select, {
      options: [{ AREANM: area1Name }, { AREANM: area2Name }],
    });

    const toggleElement = container.querySelector("#toggle");
    expect(toggleElement).not.toBeNull();

    await fireEvent.click(toggleElement);

    const area1Item = getByText(area1Name);
    const area2Item = getByText(area2Name);

    expect(area1Item).not.toBeNull();
    expect(area2Item).not.toBeNull();
  });
});
