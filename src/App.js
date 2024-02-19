import LoginForm from "./Components/Assets/LoginForm/LoginForm";
import styled from 'styled-components'
import img from './Components/Assets/background.jpg'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Crud from "./Components/Assets/Crud";

function App() {
  return (
          <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/crud" element={<Crud/>}/>
          </Routes>    
  );
}

export default App;
