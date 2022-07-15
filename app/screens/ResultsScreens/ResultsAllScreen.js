import React from "react";
import ResultListComponent from "./ResultListComponent";


function ResultsAllScreen({ navigation }) {
  return (
    <ResultListComponent navigation={navigation} state="all"/>
  );
}

export default ResultsAllScreen;