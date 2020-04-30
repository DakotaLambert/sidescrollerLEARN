import React from 'react';
import './App.css';
import GameSpace from './GameSpace';
import GameImage from './GameImage';

function App() {
  return (
    <div>
      <GameSpace />
      <GameImage id="mountains" src="assets/mountains.jpeg" />
      <GameImage id="moon" src="assets/moon.jpg" />
    </div>
  );
}

export default App;
