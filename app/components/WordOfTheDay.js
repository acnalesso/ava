import React from "react";
import WordOfTheDayStore from "../stores/WordOfTheDayStore";
import VoiceActions from "../actions/VoiceActions";

export default class WordOfTheDay extends React.Component {

  constructor() {
    super();

    this.state = WordOfTheDayStore.getState();
  }

  componentDidMount() {
    WordOfTheDayStore.listen(this.handleWordOfTheDay.bind(this));
  }

  handleWordOfTheDay(store) {
    this.setState({ word: store.word, note: store.note });
    VoiceActions.play({ text: `Hi! The word of the day is: ${store.word}. Here is what it means: ${store.note}` });
  }

  render() {
    return(
      <div>
        <h1>The word of the day is: {this.state.word}</h1>
        <h2>Description: {this.state.note}</h2>
      </div>
    );
  }

};
