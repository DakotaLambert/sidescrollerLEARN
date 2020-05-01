import React from 'react';
import './App.css';
import GameSpace from './GameSpace';
import GameImage from './GameImage';

function App() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
    }}>
      <GameSpace />
      <GameImage id="mountains" src="assets/mountains.jpg" />
      <GameImage id="moon" src="assets/moon.jpg" />
      <GameImage id="universe" src="assets/universe.jpg" />
    </div>
  );
}

export default App;
