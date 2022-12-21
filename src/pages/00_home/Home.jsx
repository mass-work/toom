import React  from 'react'
import styled from "styled-components";
import CalcFolder from '../01_calc/00_CalcFolder'
import StandardFolder from '../02_standard/00_StandardFolder'

const Home = () => {
  return (
    <StyleHome>
      <OverCalcFolder />
      <OverStandardFolder />
      <OverStandardFolder />
      <OverStandardFolder />
      <OverStandardFolder />
    </StyleHome>
  )
};
export default Home;

const StyleHome = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:space-between;
  `;
const OverCalcFolder = styled(CalcFolder)`
  flex-basis:calc((100% - 50px) / 3);
  max-width:calc((100% - 50px) / 3);
  margin-top:3%;
`
const OverStandardFolder = styled(StandardFolder)`
  flex-basis:calc((100% - 50px) / 3);
  max-width:calc((100% - 50px) / 3);
  margin-top:25px;
`

