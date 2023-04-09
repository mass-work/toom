import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const HighlighterWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9; 
`;


const Highlighter = ({ isHighlighting }) => {
  const [polylines, setPolylines] = useState([]);
  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState([]);
  const drawingInfo = useRef({ drawing: false, startX: 0, startY: 0 });

  const handleMouseDown = (event) => {
    if (!isHighlighting) return;
    drawingInfo.current.drawing = true;
  };
  
  const handleMouseMove = (event) => {
    if (drawingInfo.current.drawing) {
      const coords = getRelativeCoordinates(event);
      setPoints((prevPoints) => [...prevPoints, coords]);
    }
  };
  

  const handleMouseUp = () => {
    if (drawingInfo.current.drawing) {
      setPolylines((prevPolylines) => [...prevPolylines, points]);
      setPoints([]);
    }
    drawingInfo.current.drawing = false;
  };
  
  const wrapperRef = useRef(null);
  const getRelativeCoordinates = (event) => {
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    return {
      x: event.clientX - wrapperRect.left,
      y: event.clientY - wrapperRect.top,
    };
  };

  return (
    <HighlighterWrapper
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
<svg style={{ width: "100%", height: "100%" }}>
  {polylines.map((polylinePoints, index) => (
    <polyline
      key={index}
      points={polylinePoints.map((point) => `${point.x},${point.y}`).join(" ")}
      fill="none"
      stroke="yellow"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity="0.5"
    />
  ))}
  <polyline
    points={points.map((point) => `${point.x},${point.y}`).join(" ")}
    fill="none"
    stroke="yellow"
    strokeWidth="10"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeOpacity="0.5"
  />
</svg>
    </HighlighterWrapper>
  );
};

export default Highlighter;

