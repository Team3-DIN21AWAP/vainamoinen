import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import V1 from "./components/V1";
import V6 from "./components/V6";
 
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/v1" element={<V1/>}/>
        <Route path="/v6" element={<V6/>}/>
      </Routes>
    </Router>
  );
}
 
export default App;