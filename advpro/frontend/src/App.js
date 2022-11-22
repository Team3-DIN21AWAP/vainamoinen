import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";


 
function App() {

  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/v5" element={<V5/>}/>
      </Routes>
    </Router>
  );
}
 
export default App;