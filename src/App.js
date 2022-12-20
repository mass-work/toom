import React from 'react';
import styled from "styled-components";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/00_home/Home';

function App() {
  return (
    <StyledApp>
      {/* <Home /> */}
      <header>header</header>
      {/* <Home /> */}
      <Routes>
        <Route path="toom/" element={<Home />} />
      </Routes>
      <footer>footer</footer>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
background-color: rgb(20, 20, 25);
color: rgb(210, 210, 210);
width: 100%;
min-height: 100vh;
`;