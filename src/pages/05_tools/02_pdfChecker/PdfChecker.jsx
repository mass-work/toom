import React, { useState } from 'react';
import styled from 'styled-components';
import Desk from './Desk';
import Drawer from './Drawer';
import ToggleButton from './ToggleButton';

const PdfChecker = () => {
  const [pdfs, setPdfs] = useState([]);
  const [color, setColor] = useState();

  const onPdfLoadSuccess = ({ numPages }, id) => {
    setPdfs(prevPdfs => prevPdfs.map(pdf => {
      if (pdf.id === id) {
        return { ...pdf, numPages };
      }
      return pdf;
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newPdf = {
          id: Date.now(),
          file: file,
          data: reader.result,
          numPages: null,
        };
        setPdfs([...pdfs, newPdf]);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = null;
  };
  return (
    <CheckerContainer>
      <DrawerContainer>
        <Drawer pdfs={pdfs} setPdfs={setPdfs} />
      </DrawerContainer>
      <DeskContainer>
        <ColorSelectContainer>
        <ToggleButton setColor={setColor}/>

        </ColorSelectContainer>
        <Desk pdfs={pdfs} color={color}/>
      </DeskContainer>
    </CheckerContainer>
  );
};

export default PdfChecker;
const CheckerContainer = styled.div`
  margin: 1% 5% 1% 5%;
  display: flex;
  /* background-color: rgb(160, 33, 149); */
`;

const DrawerContainer = styled.div`
  margin: 1% 0px 0px 0px;
  padding: 0% 0% 0% 0.5%;
  width: 200px;
  height: fit-content;
  overflow-x: auto;
  background-color: rgb(40, 40, 40);
  /* background-color: rgb(149, 197, 35); */
  border-radius: 30px;

`;

const ColorSelectContainer = styled.div`

`;

const DeskContainer = styled.div`
  pointer-events: visible;
  flex: 1;
  margin: 1% 1% 1% 1%;
  background-color: rgb(40, 40, 40);
  min-width: 1400px;
  min-height: 900px;
  /* max-width: 1200px; */
  position: relative;
  overflow: hidden;
  border-radius: 30px;

`;
