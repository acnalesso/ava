import React from 'react';
import Axios from 'axios';
import VoiceActions from "../actions/VoiceActions";

const THIRTY_SECONDS = 30000;
const API_URL = 'http://localhost.hp.com:3001/stopBoard/';

export default class LiveBusArrivals extends React.Component {
  constructor() {
    super();

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = { busStopId: '' };
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.setState({ busStopId: event.target.value });
      this.getLiveArrivals();
    }
  };

  getLiveArrivals() {
    setInterval(() => {
      if (this.state.busStopId.length === 0) {
        return false;
      }


      let speech;
      Axios.get(API_URL + this.state.busStopId).then(({ data }) => {
        speech = `Good Morning Antonio! There are: ${data.arrivals.length} buses coming. The first one is : `;

        data.arrivals.forEach((arrival, index) => {
          if (index === 0) {
            if (arrival.estimatedWait === 'due') {
              speech = `${speech} due now.`;
            } else {
              speech = `${speech} in ${arrival.estimatedWait}.`;
            }

            speech = `${speech} Arriving time is: ${arrival.scheduledTime}.`;
          } else {
            speech = `${speech} The next bus is due in: ${arrival.estimatedWait}. Arriving time is: ${arrival.scheduledTime}`;
          }
        });

        VoiceActions.play({ text: speech });
      });
    }, THIRTY_SECONDS);
  }
  render() {
    return <div id='live_arrivals'>
      <h1>Live arrivals for: <input type="text" name="busStopId" onKeyPress={this.handleKeyPress} /></h1>
    </div>;
  }
};
