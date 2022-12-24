import React  from 'react'
import styled from "styled-components";
import CalcFolder from '../01_calc/00_CalcFolder'
import StandardFolder from '../02_standard/00_StandardFolder'

const Home = () => {
  return (
    <StyleHome>
      <StyleHomecontents><OverCalcFolder /></StyleHomecontents>
      <StyleHomecontents><OverCalcFolder /></StyleHomecontents>
      <StyleHomecontents><OverCalcFolder /></StyleHomecontents>
      <StyleHomecontents><OverCalcFolder /></StyleHomecontents>

      <OverStandardFolder />
      <OverStandardFolder />
      <OverStandardFolder />
      <OverStandardFolder />
    </StyleHome>
  )
};
export default Home;
const StyleHome = styled.div`
  background-color: rgb(20, 20, 20);
  margin: 0% auto 0% auto;
  width: 90%;
  max-width: 1350px;
  min-height: 80vh;
  position: relative;
  display: flex;
  flex-wrap: wrap;
`
const StyleHomecontents = styled.div`
  margin: 5% 2% 0% 5%;
  width: 25%;
  height: auto;
`
// const StyleHomecontents = styled.div`
//   flex-wrap: wrap;
//   justify-content: space-between;
// `;

const OverCalcFolder = styled(CalcFolder)`
  /* flex-basis:calc((100% - 50px) / 3);
  max-width:calc((100% - 50px) / 3);
  margin: 10px 10px 10px 10px;
  padding: 10px 10px 10px 10px; */
`
const OverStandardFolder = styled(StandardFolder)`
  /* flex-basis:calc((100% - 50px) / 3);
  max-width:calc((100% - 50px) / 3);
  margin: 10px 10px 10px 10px;
  padding: 10px 10px 10px 10px; */
`

