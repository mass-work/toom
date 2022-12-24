import React  from 'react'
import styled from "styled-components";
import CalcFolder from '../01_calc/00_CalcFolder'
import StandardFolder from '../02_standard/00_StandardFolder'

const Home = () => {
  return (
    <StyleHome>
      <StyleHomecontents><CalcFolder /></StyleHomecontents>
      <StyleHomecontents><CalcFolder /></StyleHomecontents>
      <StyleHomecontents><CalcFolder /></StyleHomecontents>
      {/* <StyleHomecontents><StandardFolder /></StyleHomecontents> */}
    </StyleHome>
  )
};
export default Home;
const StyleHome = styled.div`
  /* background-color: rgb(20, 20, 20); */
  background-color: red;
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
    display: block;
  }
`
const StyleHomecontents = styled.div`
  margin: 5% 2% 0% 5%;
  width: 25%;
  height: auto;
`
