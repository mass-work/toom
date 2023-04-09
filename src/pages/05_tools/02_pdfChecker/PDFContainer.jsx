import React, { useState, useRef  } from 'react';
import styled from 'styled-components';
import Highlighter from './Highlighter';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const PDFContainerWrapper = styled.div`
  position: relative;
  display: inline-block;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  margin: 8px;
`;

const PDFContainer = ({ pdf }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const draggingInfo = useRef({ startX: 0, startY: 0 });

  const handleMouseDown = (event) => {
    if (isHighlighting) return;
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

  const handleRotate = () => {
    console.log("回転")
    setRotation((prevRotation) => prevRotation + 90);
  };

  const [zIndex, setZIndex] = useState(0);

  const handleLayerUp = () => {
    setZIndex((prevZIndex) => prevZIndex + 1);
  };

  const handleLayerDown = () => {
    setZIndex((prevZIndex) => prevZIndex - 1);
  };

  const [isHighlighting, setIsHighlighting] = useState(false);

  return (
    <PDFContainerWrapper
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
        zIndex: zIndex,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <ButtonWrapper>
        <button onClick={handleRotate}>回転</button>
        <button onClick={handleLayerUp}>上に移動</button>
        <button onClick={handleLayerDown}>下に移動</button>
        <button onClick={() => setIsHighlighting(!isHighlighting)}>
          {isHighlighting ? "蛍光ペンを無効にする" : "蛍光ペンを有効にする"}
        </button>
      </ButtonWrapper>
      <Highlighter isHighlighting={isHighlighting} />
      <Document
        file={pdf.data}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </PDFContainerWrapper>
  );
};

export default PDFContainer;
const ButtonWrapper = styled.div`
  position: absolute;
  z-index: 10;
`;