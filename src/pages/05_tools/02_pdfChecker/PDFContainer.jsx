import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Highlighter from './Highlighter';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// const PDFContainer = ({ pdf, offset, maxZIndex, updateMaxZIndex, color }) => {
const PDFContainer = (props) => {
    const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const draggingInfo = useRef({ startX: 0, startY: 0 });
  const handleMouseDown = (event) => {
    if (event.buttons === 2) return;
    setIsDragging(true);
    draggingInfo.current.startX = event.clientX - position.x;
    draggingInfo.current.startY = event.clientY - position.y;
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      setPosition({
        x: event.clientX - draggingInfo.current.startX,
        y: event.clientY - draggingInfo.current.startY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const [zIndex, setZIndex] = useState(0);

  const handleLayerUp = () => {
    setZIndex(props.maxZIndex + 1);
    props.updateMaxZIndex(props.maxZIndex + 1);
  };

  const handleLayerDown = () => {
    setZIndex(0);
  };

  const handleDoubleClick = (event) => {
    if (event.ctrlKey) {
      handleLayerDown();
    } else {
      handleLayerUp();
    }
  };
  
  return (
    <PDFContainerWrapper
      style={{
        transform: `translate(${position.x + props.offset}px, ${position.y + props.offset}px)`,
        zIndex: zIndex,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Highlighter color = {props.color}/>
      <Document file={props.pdf.data} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} />
        ))}
      </Document>
    </PDFContainerWrapper>
  );
};

export default PDFContainer;
const PDFContainerWrapper = styled.div`
  position: absolute;
  display: inline-block;
  background-color: rgb(40, 40, 40);
  border: 2px solid rgb(40, 40, 40);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  margin: 5px;
`;
