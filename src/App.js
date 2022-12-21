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
  /* width: 500px;
  height: 10vh; */
`;
const StyledHeader = styled.header`
  background-color: rgb(60, 60, 60);
  margin: -500% -500% 0% -500%;
  padding: 500% 500% 0% 500%;
`
const StyledFooter = styled.footer`
  background-color: rgb(60, 60, 60);
  margin: 0% -500% -100% -500%;
  padding: 0% 500% 100% 500%;
`