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

  render() {
    return (<div>
      <WordOfTheDay />
    </div>);
  }
}
