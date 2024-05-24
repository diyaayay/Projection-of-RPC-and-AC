// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard"


function App(){
  return(
    <Router>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
    </Router>
  )
}

export default App;