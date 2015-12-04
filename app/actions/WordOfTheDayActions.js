import alt from "../alt";

class WordOfTheDayActions {
  constructor() {
    this.generateActions(
      'receivePayload'
    );
  }
}

export default alt.createActions(WordOfTheDayActions);
