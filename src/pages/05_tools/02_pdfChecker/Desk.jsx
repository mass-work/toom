import React from 'react';
import styled from 'styled-components';
import PDFContainer from './PDFContainer';

const DeskContainer = styled.div`
  flex: 3;
  background-color: #f0f0f0;
  padding: 16px;
  overflow: auto;
`;

const Desk = (props) => { // ここを変更
  const { pdfs } = props; // ここを追加

  return (
    <DeskContainer>
      {pdfs.slice(0, 3).map((pdf) => (
        <React.Fragment key={pdf.id}>
          {Array.from(new Array(pdf.numPages), (el, index) => (
            <PDFContainer key={`page_${index + 1}`} pdf={pdf} pageNum={index + 1} />
          ))}
        </React.Fragment>
      ))}
    </DeskContainer>
  );
};

export default Desk;
