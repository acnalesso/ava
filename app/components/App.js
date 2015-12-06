import React from "react";
import axios from "axios";
import WordOfTheDay from "./WordOfTheDay";
import News from "./News";

export default class extends React.Component {

  constructor() {
    super();

    this.state = {
      word: "",
      description: ""
    }
  }

  render() {
    return (<div>
      <WordOfTheDay />
      <News />
    </div>);
  }
}
