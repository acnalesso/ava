import React from "react";
import NewsStore from "../stores/NewsStore";
import NewsSection from "./NewsSection";

export default class News extends React.Component {

  constructor() {
    super();

    this.state = NewsStore.getState();
  }

  componentDidMount() {
    NewsStore.listen(this._handleNews.bind(this));
  }

  componentDidMount() {
    NewsStore.listen(this._handleNews.bind(this));
  }

  render() {
    return(
      <div id="news">
        <p>Top Stories</p>
        <div id="top_news">
          {this._renderNews()}
        </div>
      </div>
    );
  }

  _handleNews(store) {
    this.setState(store);
  }

  _renderNews() {
    return this.state.news.slice(0,5).map((newsItem) => {
      return <NewsSection
                title={newsItem.title}
                publishedAt={newsItem.pubDate}
                description={newsItem.description}
      />
    });
  }

};
