import RadioTestExComp from "./RadioTestExComp.svelte";
import { render } from "@testing-library/svelte";

it("it renders", async () => {
  const radioOptionName = "Yes";
  const { container, getByText } = render(RadioTestExComp, {
    props: { props: { name: radioOptionName } },
  });

  const radio = container.querySelector("input");
  const label = getByText(radioOptionName);

  expect(radio.value).toBe(radioOptionName);
  expect(label).not.toBe(null);
});
