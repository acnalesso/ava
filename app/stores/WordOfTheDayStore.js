import alt from "../alt";
import WordOfTheDayActions from "../actions/WordOfTheDayActions";

class WordOfTheDayStore {
  constructor() {
    this.bindActions(WordOfTheDayActions);

    this.state = {
      word: "",
      note: ""
    };
  }

  onReceivePayload(payload) {
    this.setState({word: payload.data.word, note: payload.data.note });
  }
}

export default alt.createStore(WordOfTheDayStore, 'WordOfTheDayStore');
