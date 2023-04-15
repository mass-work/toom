import React from 'react';
import styled from "styled-components";

const item_list = ["プログラミング(修正)", "プログラミング(作成)", "WEBデザイン", "リサーチ", "数学", "質問", "メール", "レポート", "会話"];

const ItemSelect = ({ value, onChange }) => {
  return (
    <ItemContainer>
        <div>
            <label>項目:</label>
        </div>
      <SelectContainer value={value} onChange={onChange}>
        {item_list.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </SelectContainer>
    </ItemContainer>
  );
};
export default ItemSelect;
const ItemContainer = styled.div`
  margin-bottom: 1rem;
  color: #eee;
`;

const SelectContainer = styled.select`
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

