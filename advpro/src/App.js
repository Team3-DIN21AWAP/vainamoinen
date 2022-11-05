import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/login";
import RegistrationForm from './components/RegistrationForm';
import './App.css';

function App() {
  return (
    
<Router>
      <Routes>
        <Route path='/login' exact element={<Login/>} />
        <Route path='/registration' exact element={<RegistrationForm/>} />
      </Routes>
</Router>
  );
}

export default App;
