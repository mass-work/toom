import React, { useState }  from 'react';
import styled from 'styled-components';
import PDFContainer from './PDFContainer';



const Desk = ( props ) => {
  // const { pdfs } = props;
  const [maxZIndex, setMaxZIndex] = useState(0);
  return (
    <DeskContainer>
      {props.pdfs.slice(0, 3).map((pdf, index) => (
        <React.Fragment key={pdf.id}>
          {Array.from(new Array(pdf.numPages), (el, pageIndex) => (
            <PDFContainer
              key={`page_${pageIndex + 1}`}
              pdf={pdf}
              pageNum={pageIndex + 1}
              offset={index * 30} // これを追加
              maxZIndex={maxZIndex} // これを追加
              updateMaxZIndex={(newZIndex) => setMaxZIndex(newZIndex)} // これを追加
              color={props.color}
            />
          ))}
        </React.Fragment>
      ))}
    </DeskContainer>
  );
};


export default Desk;

const DeskContainer = styled.div`
  flex: 3;
  background-color: rgb(40, 40, 40);
`;
