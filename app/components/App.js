import React from "react";
import axios from "axios";
import WordOfTheDay from "./WordOfTheDay";
import LiveBusArrivals from './LiveBusArrivals.react';

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
      <LiveBusArrivals />
    </div>);
  }
}
