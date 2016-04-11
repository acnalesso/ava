import VoiceStore from "../app/stores/VoiceStore";

VoiceStore.listen((store) => {
  if (store.ready && store.text.length > 0) {
    responsiveVoice.speak(store.text, "UK English Female");
  }
});
