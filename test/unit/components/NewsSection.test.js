import NewsSection from "../../../app/components/NewsSection";

describe('NewsSection', () => {
  let renderedComponent;
  before(() => {
    renderedComponent = renderIntoShallowDOM(<NewsSection title="title" publishedAt="2015" description="description" />);
  });

  it('shows a title', () => {
    expect(getTextOfClass(renderedComponent, 'news-section-title')).to.equal('title');
  });

  it('shows publishedAt date', () => {
    expect(getTextOfClass(renderedComponent, 'news-section-published_at')).to.equal('2015');
  });

  it('shows news description', () => {

    const description = findElementWithClass(renderedComponent, 'news-section-description');
    expect(description.props.dangerouslySetInnerHTML.__html).to.equal('description');
  });
});
