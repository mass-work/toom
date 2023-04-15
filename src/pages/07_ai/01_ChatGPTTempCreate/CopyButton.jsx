import React from 'react';
import styled from "styled-components";
const CopyButton = ({ onClick }) => {
  return (
    <ItemContainer>
      <Button onClick={onClick}>コピーする</Button>
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