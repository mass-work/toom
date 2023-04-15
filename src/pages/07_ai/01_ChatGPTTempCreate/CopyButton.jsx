import React from 'react';
import styled from "styled-components";

const CopyButton = ({ inputPrompt, summaryText, folderData, setCopyStatus }) => {
  const handleCopyClick = () => {
    const textToCopy = [
      inputPrompt || summaryText,
      folderData.map((file) => `${file.name}\n${file.content.join('\n')}`)
    ].join('\n\n');
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyStatus('copied!');
      setTimeout(() => setCopyStatus(''), 1500);
    });
  };

  return (
    <ItemContainer>
      <Button onClick={handleCopyClick}>Copy</Button>
    </ItemContainer>
  );
};

export default CopyButton;


const ItemContainer = styled.div``;

const Button = styled.button`
    padding: 0.4rem;
    border: none;
    background-color: #292929;
    color: #eee;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
    background-color: #4f4f4f;
    }
`;
