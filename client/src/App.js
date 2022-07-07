import './App.css';
import React, {createContext, useState} from 'react'
import Register from './components/register';
import Intro from './components/intro';
import Login from './components/login';
import Job from './components/job';
import EditJob from './components/editJob'
import AddJob from './components/addJob';
import {BrowserRouter as Router, Routes,Route, Switch} from 'react-router-dom'
export const IdContext = createContext();
function App() {
  const [id, setId] = useState('')
  return (
    <IdContext.Provider value={{id, setId}}>
<Routes>
<Route path="/editJob" element={<EditJob/>}/>
<Route path="/addJob" element={<AddJob/>}/>    
<Route path="/job" element={<Job/>}/>
<Route path="/Login" element={<Login/>}/>
<Route path="/Register" element={<Register/>}/>
<Route path="/" element={<Intro/>}/>    
</Routes>
    </IdContext.Provider>

 );
}

export default App;
