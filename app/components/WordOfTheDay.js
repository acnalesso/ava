import React from "react";
import WordOfTheDayStore from "../stores/WordOfTheDayStore";

export default class WordOfTheDay extends React.Component {

  constructor() {
    super();

    this.state = WordOfTheDayStore.getState();
  }

  componentDidMount() {
    WordOfTheDayStore.listen(this.handleWordOfTheDay.bind(this));
  }

  handleWordOfTheDay(store) {
    this.setState({ word: store.word, description: store.note });
  }

  render() {
    return(
      <div>
        <h1>The word of the day is: {this.state.word}</h1>
        <h2>Description: {this.state.description}</h2>
      </div>
    );
  }

};
