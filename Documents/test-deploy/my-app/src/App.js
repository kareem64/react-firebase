import logo from './logo.svg';
import Header from "./componnent/Header"
import {Routes,Route}from 'react-router-dom'
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"

function App() {
  return (
    <div>
    <Header/>
    <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route  path="/login" element={<Login/>}/>
      <Route  path="/register" element={<Register/>}/>
    </Routes>
    </div>
  
  )
}

export default App;
