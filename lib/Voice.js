import VoiceStore from "../app/stores/VoiceStore";

VoiceStore.listen((store) => {
  if (store.ready) {
    responsiveVoice.speak(store.text, "UK English Female");
  }
});
