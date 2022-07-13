import React from "react";
import ResultListComponent from "./ResultListComponent";


const users = [
  {
    id: 1,
    name: "Den",
    country: "Russia",
    age: 20,
  },
  {
    id: 2,
    name: "Klara",
    country: "Russia",
    age: 20,
  },
  {
    id: 3,
    name: "Alex",
    country: "USA",
    age: 20,
  },
  {
    id: 4,
    name: "Gera",
    country: "Germany",
    age: 20,
  },
  {
    id: 5,
    name: "Timo",
    country: "Germany",
    age: 20,
  },
];

const teams = [
  {
    id: 1,
    competition: "Плавание",
    team_name: "Будь здоров",
    partisipants: [1, 2],
  },
  {
    id: 2,
    competition: "Плавание",
    team_name: "Wie ein Titanic",
    partisipants: [4, 5],
  },
  {
    id: 3,
    competition: "Плавание",
    team_name: "International",
    partisipants: [2, 3, 4],
  },
];

const filters_default = [
  {
    id: 1,
    filter_name: "Лучшие",
    users: ["Den", "Klara", "Garic", "Monica", "Peter"],
  },
  {
    id: 2,
    filter_name: "Мои",
    users: ["Gera", "Klara"],
  },
];

function ResultsForYouScreen({ navigation }) {
  return (
    <ResultListComponent state="for_you"/>
  );
}

export default ResultsForYouScreen;
