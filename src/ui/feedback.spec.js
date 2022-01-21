import Feedback from './Feedback.svelte'
import { render, fireEvent } from '@testing-library/svelte'

const BaseLinkURL = 'http://localhost';

it('it renders', async () => {
  const { getByText } = render(Feedback);

  const heading = getByText('Is this page useful?');
  const yesLink = getByText('Yes');
  const noLink = getByText('No');
  const notFoundLink = getByText("Can't find what you're looking for?");
  
  expect(heading).not.toBe(null);
  expect(yesLink).not.toBe(null);
  expect(yesLink.href).toBe(BaseLinkURL + '/feedback/thanks');
  expect(noLink).not.toBe(null);
  expect(noLink.href).toBe(BaseLinkURL + '/feedback?service=cmd');
  expect(notFoundLink).not.toBe(null);
  expect(notFoundLink.href).toBe(BaseLinkURL + '/feedback?service=cmd');
  
  await fireEvent.click(yesLink);
});
