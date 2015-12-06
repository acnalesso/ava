import alt from "../alt";
import NewsActions from "../actions/NewsActions";

class NewsStore {
  constructor() {
    this.bindActions(NewsActions);

    this.state = { news: [] };
  }

  onReceivePayload(payload) {
    this.setState({ news: payload.rss.channel.item });
  }

}

export default alt.createStore(NewsStore, "NewsStore");
