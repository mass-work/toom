import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from './pages/00_home/Home';
import BeamCalc from './pages/01_calc/01_BeamCalc/BeamCalc'
import HomeIcon from '@mui/icons-material/Home';
import WavesIcon from '@mui/icons-material/Waves';
import Nut from './pages/02_elements/02_Nut/Nut';
import Fft from './pages/05_mesure/01_fft/Fft';
import MotionRec from './pages/05_mesure/02_motionRec/MotionRec'

function App() {
  return (
    <StyledApp>
      <StyledHeader>
        TooM -Toolbox for Manufacturing-
        <Link to={`/toom/`}><HomeIcon style={{color:"rgb(210, 210, 210)"}}/></Link>
        <Link to={`/toom/mesure/fft/`}><WavesIcon style={{color:"rgb(210, 210, 210)"}}/></Link>
        <Link to={`/toom/mesure/motionrec/`}><WavesIcon style={{color:"rgb(210, 210, 210)"}}/></Link>
      </StyledHeader>
        <Routes>
          <Route path="/toom/" element={<Home />} />
          <Route path="/toom/beamcalc/" element={<BeamCalc />} />

          <Route path="/toom/elements/nut/" element={<Nut />} />
          <Route path="/toom/mesure/fft/" element={<Fft />} />
          <Route path="/toom/mesure/motionrec/" element={<MotionRec />} />
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
  @media screen and (max-width: 960px) {
  }
  @media screen and (max-width: 760px) {
  }
`
const StyledFooter = styled.footer`
  background-color: rgb(60, 60, 60);
  margin: 0% 0% -100% 0%;
  padding: 0% 0% 100% 0%;
  @media screen and (max-width: 960px) {
  }
  @media screen and (max-width: 760px) {
    font-size: 9px;
  }
`