import React from "react";
import ResultListComponent from "./ResultListComponent";


function ResultsForYouScreen({ navigation }) {
  return (
    <ResultListComponent navigation={navigation} state="for_you"/>
  );
}

export default ResultsForYouScreen;
