import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const Highlighter = (props) => {
  const [polylines, setPolylines] = useState([]);
  const [points, setPoints] = useState([]);
  const drawingInfo = useRef({ drawing: false, startX: 0, startY: 0 });

  const handleMouseDown = (event) => {
    if (event.buttons !== 2) return;
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
      setPolylines((prevPolylines) => [
        ...prevPolylines,
        { points: points, color: props.color },
      ]);
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
      onContextMenu={(e) => e.preventDefault()}
    >
      <svg style={{ width: '100%', height: '100%' }}>
        {polylines.map((polyline, index) => (
          <polyline
            key={index}
            points={polyline.points
              .map((point) => `${point.x},${point.y}`)
              .join(' ')}
            fill='none'
            stroke={polyline.color}
            strokeWidth='10'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeOpacity='0.3'
          />
        ))}
        <polyline
          points={points.map((point) => `${point.x},${point.y}`).join(' ')}
          fill='none'
          stroke={props.color}
          strokeWidth='10'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeOpacity='0.3'
        />
      </svg>
    </HighlighterWrapper>
  );
};

export default Highlighter;

const HighlighterWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;

`;
