import './App.css';
import NoteState from './context/NoteState';
import React from "react";
import Home from './components/Home';


function App() {
  return (
    <NoteState>
      <Home/>
    </NoteState>
  );
}

export default App;
