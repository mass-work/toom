import React  from 'react'
import styled from "styled-components";
import CalcFolder from '../01_calc/00_CalcFolder'
import MechanicalFolder from '../03_mechanical/00_MechanicalFolder';
import CadFolder from '../04_cad/00_CadFolder';
import MesureFolder from '../05_mesure/00_MesureFolder';
import MachiningFolder from '../06_machining/00_MachiningFolder';
// import StandardFolder from '../02_elements/00_StandardFolder'
import ElementsFolder from '../02_elements/00_ElementsFolder';

const Home = () => {
  return (
    <StyleHome>
      <StyleHomecontents><ElementsFolder /></StyleHomecontents>
      <StyleHomecontents><CalcFolder /></StyleHomecontents>
      <StyleHomecontents><MechanicalFolder /></StyleHomecontents>
      <StyleHomecontents><CadFolder /></StyleHomecontents>
      <StyleHomecontents><MesureFolder /></StyleHomecontents>
      <StyleHomecontents><MachiningFolder /></StyleHomecontents>
      <StyleHomecontents><CalcFolder /></StyleHomecontents>
    </StyleHome>
  )
};
export default Home;
const StyleHome = styled.div`
  /* background-color: rgb(20, 20, 20); */
  /* background-color: red; */
  margin: 0% auto 0% auto;
  width: 90%;
  max-width: 1350px;
  min-height: 80vh;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 960px) {
  }
  @media screen and (max-width: 760px) {
    max-width: 740px;
    flex-direction: column;
  }
`
const StyleHomecontents = styled.div`
  border-radius: 5px;
  margin: 2% 2% 5% 5%;
  width: 25%;
  height: auto;
  @media screen and (max-width: 760px) {
    /* background-color: yellow; */
    margin: 2% 0% 0% 0%;
    padding: 0% 0% 0% 0%;
    width: 100%;
  }
`
