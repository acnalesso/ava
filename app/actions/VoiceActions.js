import alt from "../alt";

class VoiceActions {
  constructor() {
  }

  play(payload) {
    setTimeout(() => { this.dispatch(payload); }, 0);
  }
}

export default alt.createActions(VoiceActions);
