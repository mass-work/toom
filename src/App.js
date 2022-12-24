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
      <StyledHeader>
        TooM -Toolbox for Manufacturing-
        <Link to={`/toom/`}><HomeIcon style={{color:"rgb(210, 210, 210)"}}/></Link>
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
  color: rgb(210, 210, 210);
  margin: 0%;
  padding: 0%;
  /* width: 500px;
  height: 10vh; */
  @media screen and (max-width: 960px) {
    color: rgb(210, 210, 210);
  }
`;
const StyledHeader = styled.header`
  background-color: rgb(60, 60, 60);
  margin: -10% 0% 0% 0%;
  padding: 10% 0% 0% 0%;
`
const StyledFooter = styled.footer`
  background-color: rgb(60, 60, 60);
  margin: 0% 0% -100% 0%;
  padding: 0% 0% 100% 0%;
`