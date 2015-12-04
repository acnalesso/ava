import { expect } from "chai";
import TestUtils from "react-addons-test-utils";
import WordOfTheDay from "../../../app/components/WordOfTheDay";
import WordOfTheDayActions from "../../../app/actions/WordOfTheDayActions";
const shallowRenderer = TestUtils.createRenderer();

describe('WordOfTheDay', () => {

  let renderedComponent;
  const Component = <WordOfTheDay />;
  before(() => {
    WordOfTheDayActions.receivePayload({
      data: {
        word: 'word-of-the-day-here',
        description: 'description'
      }
    });

    renderedComponent = renderIntoShallowDOM(Component);
  });

  it('shows the word of the day', () => {
    const text = getTextOfTag(renderedComponent, 'h1');
    expect(text).to.contain('word-of-the-day-here');
  });

  it('shows its description', () => {
    const description = getTextOfTag(renderedComponent, 'h2');
    expect(description).to.contain('description');
  });
});
