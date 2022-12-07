import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import V1 from "./components/V1";
import V7 from "./components/V7";
import V5 from "./components/V5";
import V10 from "./components/V10";
 
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/v1" element={<V1/>}/>
        <Route path="/v7" element={<V7/>}/>
        <Route path="/v5" element={<V5/>}/>
        <Route path="/v10" element={<V10/>}/>
      </Routes>
    </Router>
  );
}
 
export default App;