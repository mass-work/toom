import React, { useState }  from 'react'
import styled from "styled-components";
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import {Grid} from '@mui/material';
import Modal from '../../common/components/Modal';
// import CardBeamCalc from './01_CardBeamCalc';

const StandardFolder = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <FolderBotton onClick={() => setShow(true)}>
        <StyledFolder>規格<br></br>Standard
        <p>
          <OverMenuBookOutlinedIcon />
          {/* <MenuBookOutlinedIcon style={{display:"flex", fontSize: "300px", alignItems: "center", justifyContent: "center"}}/> */}
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
export default StandardFolder

const OverMenuBookOutlinedIcon = styled(MenuBookOutlinedIcon)`
  /* transform: scale(18);
  padding: 2px;
  margin: 200px;
  @media screen and (max-width: 960px) {
    transform: scale(6);
    padding: 1px;
    margin: 60px;
  } */
`

const StyledFolder = styled.div`
  background-color: rgb(40, 40, 40);
  color: rgb(200, 200, 200);
  margin: 5%;
  padding: 5%;
  width: 300px;
  height: 350px;
&:hover{
    background: rgb(60, 60, 60);
}
`;

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