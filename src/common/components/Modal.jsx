import React from 'react'
import styled from "styled-components";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

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
            <CloseBotton onClick={closeModal}><NewCancelPresentationIcon fontSize="large"/></CloseBotton>
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
  background-color:rgba(60,60,60,1);
  overflow-y: scroll;
  /*　画面の中央に要素を表示させる設定　*/
  /* display: flex;
  align-items: center;
  justify-content: center; */
`
const NewCancelPresentationIcon = styled(CancelPresentationIcon)`
&:hover{
    color: rgb(20, 20, 20);
`

const CloseBotton = styled.button`
  position:absolute;
  top: 1%;
  right: 1%;
  color: rgb(210, 210, 210);
  border: none;
  background: transparent;
  margin: 10px;
`