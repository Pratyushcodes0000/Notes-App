import React from "react";
import Sidebar from './components/Sidebar'
import Home from './Home'
import Notes from "./Notes"
import AI from './AI'
import ThemeToggle from './components/ThemeToggle'

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css'

const App = ()=>{
return(
 <Router>
  <div className="app">
    <ThemeToggle />
    <Sidebar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Notes" element={<Notes/>}/>
      <Route path="/AI" element={<AI/>}/>
    </Routes>
  </div>
 </Router>
);
}

export default App;