import React, { useState }  from 'react'
import styled from "styled-components";
import CalculateIcon from '@mui/icons-material/Calculate';
import {Grid} from '@mui/material';
import Modal from '../../common/components/Modal';
import CardBeamCalc from './01_CardBeamCalc';

const CalcFolder = () => {
  const [show, setShow] = useState(false);
  const sw = window.screen.width;
  let division = 6
  const gridDivision = () => {
  if (sw > 760){
    division = 4
  }else{
    division = 12
  }
  return division
  }
  return (
    <div>
      <StyledCalcFolder>
        <FolderBotton onClick={() => setShow(true)}>
          <StyledFolder>
            <StyledIcon>
              <CalculateIcon style={{float:"right", fontSize: "35px"}}/>
            </StyledIcon>
            <StyledTitle>
              計算<br></br>Calculator
            </StyledTitle>
            <FolderGrid>
              <FolderCard><CardBeamCalc/></FolderCard>
              <FolderCard><CardBeamCalc/></FolderCard>
              <FolderCard><CardBeamCalc/></FolderCard>
              <FolderCard><CardBeamCalc/></FolderCard>
              <FolderCard><CardBeamCalc/></FolderCard>
              <FolderCard><CardBeamCalc/></FolderCard>
            </FolderGrid>
          </StyledFolder>
        </FolderBotton>
      </StyledCalcFolder>

      <OverModal show={show} setShow={setShow}>
        {/* <p>Childrenを使っています。</p> */}
        <ModalTitle>   計算</ModalTitle>
          <ModalGrid container spacing={5} padding={5}>
          <Grid item xs={gridDivision()}><CardBeamCalc/></Grid>
          <Grid item xs={gridDivision()}><CardBeamCalc/></Grid>
          <Grid item xs={gridDivision()}><CardBeamCalc/></Grid>
          <Grid item xs={gridDivision()}><CardBeamCalc/></Grid>
          <Grid item xs={gridDivision()}><CardBeamCalc/></Grid>
          <Grid item xs={gridDivision()}><CardBeamCalc/></Grid>
          <Grid item xs={gridDivision()}><CardBeamCalc/></Grid>
          <Grid item xs={gridDivision()}><CardBeamCalc/></Grid>
          </ModalGrid>
      </OverModal>

    </div>
  )
}
export default CalcFolder

const StyledCalcFolder = styled.div`
  max-width: 350px;
  min-width: 120px;
  padding: 0%;
  margin: 0%;
  @media screen and (max-width: 760px) {
    /* background-color: blue; */
    margin: 2% 3% 12% 3%;
  }
`
const FolderBotton = styled.button`
  border: none;
  background: transparent;
  margin: 0%;
  padding: 0%;
  width: 100%;
  height: 100%;
`
const StyledFolder = styled.div`
  border-radius: 15px;
  background-color: rgb(40, 40, 40);
  /* background-color: blue; */
  color: rgb(200, 200, 200);
  margin: 0% 0% -8% 0%;
  padding: 0% 0% 2% 0%;
  &:hover{
    background: rgb(60, 60, 60);
}
`
const StyledIcon = styled.div`
  float: left;
  padding: 3% 0% 3% 1%;
  right: 60%;
  width: 39%;
  height: auto;
`
const StyledTitle = styled.div`
  float: right;
  text-align: left;
  padding: 3% 0% 3% 1%;
  left: 60%;
  width: 59%;
  height: auto;
`
const FolderGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
  width: 8px;
  height: 20px;
  }
  &::-webkit-scrollbar-track {
  background-color: rgba(80, 80, 80, 0.3);
  border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb {
  background: rgba(100, 100, 100, 0.5);
  border-radius: 100px;
  width: 130px;
  }
`
const FolderCard = styled.div`
  width: 46%;
  margin: 2%;
  padding: 0%;
  overflow: hidden;
  aspect-ratio: 5 / 3.4;
  border-radius: 5px;
`
const OverModal = styled(Modal)`
  display: flex;
  float: inline-start;
`
const ModalTitle = styled.h3`
  margin: 10px 0px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ModalGrid = styled(Grid)`
  position: absolute;
  top: 10px;
`