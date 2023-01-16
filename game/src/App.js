import React, { useState } from "react";
import Score from "./components/score.js"
import Cards from "./components/cards.js"
import './App.css';


function App() {
  return (
    <div className="App">
    <Score />
    <Cards />
    </div>
  );
}

export default App;
