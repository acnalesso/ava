import alt from "../alt";

class VoiceActions {
  constructor() {
    this.generateActions(
      'play'
    );
  }
}

export default alt.createActions(VoiceActions);
