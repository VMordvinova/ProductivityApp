import { useState } from 'react'
import './App.css'
import Timer from "./components/Timer"
import NavBar from "./components/NavBar"

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Timer />
    </div>
  );
}

export default App;
