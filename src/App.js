import React from 'react';
import styled from "styled-components";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/00_home/Home';

function App() {
  return (
    <StyledApp>
      {/* <Home /> */}
      <StyledHeader>header</StyledHeader>
      {/* <Home /> */}
      <Routes>
        <Route path="toom/" element={<Home />} />
      </Routes>
      <StyledFooter>footer</StyledFooter>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  background-color: rgb(20, 20, 25);
  color: rgb(210, 210, 210);
  width: 100%;

`;

const StyledHeader = styled.header`
  background-color: rgb(60, 60, 60);
`
const StyledFooter = styled.footer`
  background-color: rgb(60, 60, 60);
  min-height: 100vh;
`