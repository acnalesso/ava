import alt from "../alt";

class NewsActions {
  constructor() {
    this.generateActions('receivePayload');
  }
}

export default alt.createActions(NewsActions);
