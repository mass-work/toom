import React, { useState }  from 'react'
import styled from "styled-components";
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import BallotIcon from '@mui/icons-material/Ballot';
import {Grid} from '@mui/material';
import Modal from '../../common/components/Modal';
// import CardBeamCalc from './01_CardBeamCalc';


const CalcFolder = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <FolderBotton onClick={() => setShow(true)}>
        <StyledFolder>規格
          <DesktopWindowsIcon />
          <BallotIcon />
        <p>
          <MenuBookOutlinedIcon  style={{display:"flex", fontSize: "200px", alignItems: "center", justifyContent: "center" }}/>
        </p>
        </StyledFolder>
      </FolderBotton>
      <OverModal show={show} setShow={setShow}>
        {/* <p>Childrenを使っています。</p> */}
        <ModalTitle>規格</ModalTitle>
        <OverGrid container>
          {/* <Grid item xs={4}><CardBeamCalc/></Grid>
          <Grid item xs={4}><CardBeamCalc/></Grid>
          <Grid item xs={4}><CardBeamCalc/></Grid>
          <Grid item xs={4}><CardBeamCalc/></Grid> */}
        </OverGrid>
      </OverModal>
    </div>
  )
}
export default CalcFolder

const StyledFolder = styled.div`
  background-color: rgb(40, 40, 40);
  color: rgb(200, 200, 200);
  margin: 5%;
  padding: 5%;
  width: 100%;
  height: 100%;
&:hover{
    background: rgb(60, 60, 60);
}`;

const FolderBotton = styled.button`
  border: none;
  background: transparent;
  margin: 10px;
`
const ModalTitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
`
const OverModal = styled(Modal)`
  display: flex;

`
const OverGrid = styled(Grid)`
  position: absolute;
  top: 7%;

`