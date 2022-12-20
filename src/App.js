import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from './pages/00_home/Home';
import BeamCalc from './pages/01_calc/01_BeamCalc/BeamCalc'
import HomeIcon from '@mui/icons-material/Home';

function App() {
  return (
    <StyledApp>
      <StyledHeader>StyledHeader
        <Link to={`/toom/`}><HomeIcon /></Link>
      </StyledHeader>
      <Routes>
        <Route path="/toom/" element={<Home />} />
        <Route path="/toom/beamcalc/" element={<BeamCalc />} />
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