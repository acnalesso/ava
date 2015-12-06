import alt from "../alt";
import VoiceActions from "../actions/VoiceActions";

class VoiceStore {
  constructor() {
    this.bindActions(VoiceActions);

    responsiveVoice.AddEventListener("OnLoad", () => {
      window.setTimeout(() => {
        this.setState({ ready: true });
      }, 500);
    });

    this.state = { ready: false, text: "" };
  }

  onPlay(payload) {
    this.setState({ text: payload.text });
  }

}

export default alt.createStore(VoiceStore, "VoiceStore");
