import React  from 'react'
import styled from "styled-components";
import CalcFolder from '../01_calc/00_CalcFolder'
import StandardFolder from '../02_standard/00_StandardFolder'
// import HomeIcon from '@mui/icons-material/Home';
// import { Link } from "react-router-dom";

const Home = () => {
  return (
    <StyleHome>
      <CalcFolder />
      <StandardFolder />
    </StyleHome>
  )
};
export default Home;

const StyleHome = styled.div`
  background-color: rgb(20, 20, 25);
`;

