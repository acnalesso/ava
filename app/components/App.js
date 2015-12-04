import React from "react";
import axios from "axios";
import WordOfTheDay from "./WordOfTheDay";

export default class extends React.Component {

  constructor() {
    super();

    this.state = {
      word: "",
      description: ""
    }
  }
  play(text){
    //responsiveVoice.speak(text);
  }

  getWordOfTheDay() {
    //return axios.get('http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').
    //  then((response) => {
    //    this.setState({ word: response.data.word, description: response.data.note, example: response.data.examples[0].text });
    //  });
  }

  componentDidMount() {
    //this.getWordOfTheDay().then((res) => {
    //  this.play(`Hi Antonio! The word of the day is:  ${this.state.word}. Here is an example:  ${this.state.example}`);
    //});
  }

  render() {
    return (<div>
      <WordOfTheDay />
    </div>);
  }
}
