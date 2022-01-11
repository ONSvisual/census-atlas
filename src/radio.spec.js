import Radio from './Radio.svelte'
import { render } from '@testing-library/svelte'

it('it renders', async () => {
  const radioOptionName = "Yes";
  const { container, getByText } = render(Radio, {
    props: {props: {name: radioOptionName}}
  });

  const radio = container.querySelector("input");
  const label = getByText(radioOptionName);

  console.log(radio.value);
  expect(radio.value).toBe(radioOptionName);
  expect(label).not.toBe(null);
});
