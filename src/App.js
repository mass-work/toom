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
import MotionRec from './pages/05_mesure/01_fft/MotionRec'
import "fontsource-noto-sans-jp"


function App() {
  return (
    <StyledApp>
      <StyledHeader>
        <HeaderTitle>TooM</HeaderTitle>
        <HeaderSubTitle>-ものづくりのためのツールボックス-</HeaderSubTitle>
      </StyledHeader>
      <StyledHeaderUnder></StyledHeaderUnder>
        <Routes>
          <Route path="/toom/" element={<Home />} />
          <Route path="/toom/beamcalc/" element={<BeamCalc />} />

          <Route path="/toom/elements/nut/" element={<Nut />} />
          <Route path="/toom/mesure/fft/" element={<Fft />} />
          <Route path="/toom/mesure/motionrec/" element={<MotionRec />} />
        </Routes>
      <StyledFooter>
        footer
        <Link to={`/toom/`}><HomeIcon style={{color:"rgb(210, 210, 210)"}}/></Link>
        <Link to={`/toom/mesure/fft/`}><WavesIcon style={{color:"rgb(210, 210, 210)"}}/></Link>
        <Link to={`/toom/mesure/motionrec/`}><WavesIcon style={{color:"rgb(210, 210, 210)"}}/></Link>

      </StyledFooter>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  font-family: 'Noto Sans JP';
  color: rgb(210, 210, 210);
  margin: 0%;
  padding: 0%;
  @media screen and (max-width: 960px) {
    color: rgb(210, 210, 210);
  }
`;
const HeaderTitle = styled.h5`
  display: table-cell;
  text-align: right;
`
const HeaderSubTitle = styled.div`
  display: table-cell;
  text-align: left;
  font-size: 10px;
`
const StyledHeader = styled.header`
  display: table;
  margin-left: 12%;
  width: 100%;
  font-size: 30px;
  @media screen and (max-width: 960px) {
  }
  @media screen and (max-width: 760px) {
  }
`
const StyledHeaderUnder = styled.div`
  padding-top: 2px;
  margin-left: 5%;
  margin-right: 5%;
  background: linear-gradient(to right, #5854a8, #7874c8); 
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