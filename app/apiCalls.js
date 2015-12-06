import axios from "axios";
import WordOfTheDayActions from "./actions/WordOfTheDayActions";
import NewsActions from "./actions/NewsActions";

axios.get('http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').
  then((payload) => {
    WordOfTheDayActions.receivePayload(payload);
  });

axios.get('http://localhost.ava.com:3001/google/news').
  then((payload) => {
    NewsActions.receivePayload(payload.data);
  });
