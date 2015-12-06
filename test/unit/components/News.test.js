import News from "../../../app/components/News";
import NewsActions from "../../../app/actions/NewsActions";

describe('News', () => {

  let renderedComponent;
  before(() => {
    NewsActions.receivePayload({
      "rss": {
        "channel": {
          "item": [
            { "title": "Testing", "pubDate": "date", "description": "description" },
            { "title": "Testing", "pubDate": "date", "description": "description" },
            { "title": "Testing", "pubDate": "date", "description": "description" },
            { "title": "Testing", "pubDate": "date", "description": "description" },
            { "title": "Testing", "pubDate": "date", "description": "description" }
          ]
        }
      }
    });

    renderedComponent = renderIntoShallowDOM(<News />);
  });

  it('displays 5 top news', () => {
    expect(findElementWithId(renderedComponent, 'top_news').props.children.length).to.equal(5);
  });

  it('sets state when data has changed', () => {

    NewsActions.receivePayload({
      "rss": {
        "channel": {
          "item": [
            { "title": "Testing", "pubDate": "date", "description": "description" },
            { "title": "Testing", "pubDate": "date", "description": "description" }
          ]
        }
      }
    });

    const newlyRenderedComponent = getMountedInstance();
    expect(newlyRenderedComponent.state.news.length).to.equal(2);
  });

});
