import alt from "../alt";
import WordOfTheDayActions from "../actions/WordOfTheDayActions";

class WordOfTheDayStore {
  constructor() {
    this.bindActions(WordOfTheDayActions);

    this.state = {
      word: "",
      description: ""
    };
  }

  onReceivePayload(payload) {
    this.setState(payload.data);
  }
}

export default alt.createStore(WordOfTheDayStore, 'WordOfTheDayStore');
