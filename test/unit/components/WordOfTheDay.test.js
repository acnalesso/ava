import WordOfTheDay from "../../../app/components/WordOfTheDay";
import WordOfTheDayActions from "../../../app/actions/WordOfTheDayActions";
import VoiceActions from "../../../app/actions/VoiceActions";

const shallowRenderer = TestUtils.createRenderer();

describe('WordOfTheDay', () => {

  let renderedComponent;
  before(() => {
    WordOfTheDayActions.receivePayload({
      data: {
        word: 'word-of-the-day-here',
        note: 'meaning'
      }
    });

    renderedComponent = renderIntoShallowDOM(<WordOfTheDay />);
  });

  it('shows the word of the day', () => {
    const text = getTextOfTag(renderedComponent, 'h1');
    expect(text).to.contain('word-of-the-day-here');
  });

  it('shows its meaning', () => {
    const note = getTextOfTag(renderedComponent, 'h2');
    expect(note).to.contain('meaning');
  });

  it('sets state when word of the day changes', () => {
    WordOfTheDayActions.receivePayload({
      data: {
        word: 'new-word',
        note: 'new-meaning'
      }
    });

    var newlyRenderedComponent = getMountedInstance();

    expect(newlyRenderedComponent.state.word).to.eq('new-word');
    expect(newlyRenderedComponent.state.note).to.eq('new-meaning');
  });

});
