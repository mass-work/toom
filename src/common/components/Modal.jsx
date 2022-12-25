import React from 'react'
import styled from "styled-components";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const Modal = ({ show, setShow, children }) => {
  const closeModal = () => {
    setShow(false);
  };

  if (show) {
    return (
      <StyledOverlay onClick={closeModal}>
        <StyledModalWindow>
          <div id="content" onClick={(e) => e.stopPropagation()}>
            {children}
            <CloseBotton onClick={closeModal}><NewCancelIcon fontSize="large"/></CloseBotton>
          </div>
        </StyledModalWindow>
      </StyledOverlay>
    );
  } else {
    return null;
  }
}

export default Modal;
const StyledOverlay = styled.div`
  z-index: 10;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(20, 20, 20, 0.3);
  
`
const StyledModalWindow = styled.div`
  position:fixed;
  top:10%;
  left:10%;
  width:80%;
  height:80%;
  max-width: 1000px;
  min-width: 300px;
  background-color:rgba(60,60,60,1);
  border-radius: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
  width: 20px;
  height: 10px;
  padding: 20% 0% 20% 0%;
  margin: 20% 0% 20% 0%;
  }
  &::-webkit-scrollbar-track {
  background-color: rgba(60, 60, 60, 0.3);
  border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb {
  background: rgba(100, 100, 100, 0.5);
  border-radius: 100px;
  width: 130px;
  }
`
const NewCancelIcon = styled(ClearRoundedIcon)`
&:hover{
    color: rgb(120, 120, 120);
`
const CloseBotton = styled.button`
  position:absolute;
  top: 0%;
  right: 0%;
  color: rgb(210, 210, 210);
  border: none;
  background: transparent;
  margin: 10px;
`