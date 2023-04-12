import React, { useState } from 'react';
import styled from 'styled-components';

function ToggleButton(props) {
    const [selectedButton, setSelectedButton] = useState('button1');
    const [color, setColor] = useState('green');

  const handleButtonClick = (buttonName) => {
    switch(buttonName) {
        case 'button1':
          setColor('green');
          break;
        case 'button2':
          setColor('orange');
          break;
        case 'button3':
          setColor('yellow');
          break;
        case 'button4':
          setColor('cyan');
          break;
        default:
          setColor('green');
      }
    setSelectedButton(buttonName);
  }
  props.setColor(color);

  return (
    <ButtonContainer>
      <GreenButton onClick={() => handleButtonClick('button1')} selected={selectedButton === 'button1'}></GreenButton>
      <OrangeButton onClick={() => handleButtonClick('button2')} selected={selectedButton === 'button2'}></OrangeButton>
      <YellowButton onClick={() => handleButtonClick('button3')} selected={selectedButton === 'button3'}></YellowButton>
      <CyanButton onClick={() => handleButtonClick('button4')} selected={selectedButton === 'button4'}></CyanButton>
    </ButtonContainer>
  );
}

export default ToggleButton;
const ButtonContainer = styled.div`
    margin-top: 1%;
    margin-left: 1%;
    font-size: 16px;
    border: none;
    outline: none;
    /* background-color: aliceblue; */
    height: fit-content;
    width: fit-content;
`
const GreenButton = styled.button`
  background-color: rgb(50, 202, 50);
  padding: 10px;
  margin-right: 10px;
  border-radius: 100%;
  cursor: pointer;
  outline: ${props => props.selected ? "3px solid white;" : 'white'}; 
  outline-offset: -3px;
`;
const OrangeButton = styled.button`
  background-color: rgb(231, 155, 40);
  padding: 10px;
  margin-right: 10px;
  border-radius: 100%;
  cursor: pointer;
  outline: ${props => props.selected ? "3px solid white;" : 'white'}; 
  outline-offset: -3px;
`;
const YellowButton = styled.button`
  background-color: rgb(214, 214, 67);
  padding: 10px;
  margin-right: 10px;
  border-radius: 100%;
  cursor: pointer;
  outline: ${props => props.selected ? "3px solid white;" : 'white'}; 
  outline-offset: -3px;
`;
const CyanButton = styled.button`
  background-color: rgb(146, 233, 233);
  padding: 10px;
  margin-right: 10px;
  border-radius: 100%;
  cursor: pointer;
  outline: ${props => props.selected ? "3px solid white;" : 'white'}; 
  outline-offset: -3px;
`;