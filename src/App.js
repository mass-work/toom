import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from './pages/00_home/Home';
import BeamCalc from './pages/01_calc/01_BeamCalc/BeamCalc'
import HomeIcon from '@mui/icons-material/Home';
import WavesIcon from '@mui/icons-material/Waves';
import Nut from './pages/02_elements/02_Nut/Nut';
import Fft from './pages/05_tools/01_fft/Fft';
import Test from './pages/05_tools/02_pdfChecker/PdfChecker'
import ChatGPTTempCreate from './pages/07_ai/01_ChatGPTTempCreate/ChatGPTTempCreate';
import "fontsource-noto-sans-jp"


function App() {
  return (
    <StyledApp>
      <StyledHeader>
        <HeaderLink to={`/toom/`}>TooM</HeaderLink>
        <HeaderSubTitle>-ものづくりのためのツールボックス-</HeaderSubTitle>
      </StyledHeader>
      <StyledHeaderUnder></StyledHeaderUnder>
        <Routes>
          <Route path="/toom/" element={<Home />} />
          <Route path="/toom/beamcalc/" element={<BeamCalc />} />
          <Route path="/toom/elements/nut/" element={<Nut />} />
          <Route path="/toom/tools/fft/" element={<Fft />} />
          <Route path="/toom/tools/pdfcheker" element={<Test />} />
          <Route path="/toom/tools/" element={<ChatGPTTempCreate />} />
        </Routes>
      <StyledFooter>
        footer
        <Link to={`/toom/`}><HomeIcon style={{color:"rgb(210, 210, 210)"}}/></Link>
        <Link to={`/toom/tools/fft/`}><WavesIcon style={{color:"rgb(210, 210, 210)"}}/></Link>
        <Link to={`/toom/tools/pdfcheker`}><WavesIcon style={{color:"rgb(210, 210, 210)"}}/></Link>
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
`
const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 30px;
  /* background: #985918; */
  @media screen and (max-width: 960px) {
  }
  @media screen and (max-width: 760px) {
  }
`;

const HeaderLink = styled(Link)`
  color: rgb(210, 210, 210);
  text-decoration: none;
  font-size: 25px;
  font-weight: bold;
  /* background: #9859a8; */
  flex: 1;
  text-align: right;
`;

const HeaderSubTitle = styled.div`
  text-align: left;
  font-size: 10px;
  padding-left: 5px;
  padding-top: 15px;
  flex: 1;
`;

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