import React from "react";

export default class NewsSection extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div>
        <p className="news-section-title">{this.props.title}</p>
        <p className="news-section-published_at">{this.props.publishedAt}</p>
        <div className="news-section-description" dangerouslySetInnerHTML={{__html: this.props.description}}></div>
      </div>
    );
  }
};
