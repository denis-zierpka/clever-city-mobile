import React from "react";
import ResultListComponent from "./ResultListComponent";


function ResultsYourScreen({ navigation }) {
  return (
    <ResultListComponent navigation={navigation} state="your"/>
  );
}


export default ResultsYourScreen;