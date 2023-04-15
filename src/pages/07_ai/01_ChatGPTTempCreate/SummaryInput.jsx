import React, { useEffect } from 'react';
import styled from "styled-components";

const summaryTexts = {
// -------------------------------------------
  "プログラミング(修正)": `<概要>
 コードの修正をして下さい。
<言語>
・
<修正/追加項目>
・
・
<出力要件>
・各プログラム毎にコードビューは分割して出力すること。
・出力が多い場合は、コードビューを重点的に出力すること。
<エラー>
<コード>
`,
// -------------------------------------------
"WEBデザイン": `<概要>
要件に沿ったデザインを作成してください。
<スタイル>
・
<カラー>
・背景:
・文字:
<フォント>
・
<デバイス>
・PC/スマートフォン
<その他>
・
・
<出力要件>
・各プログラム毎にコードビューは分割して出力すること。
・出力が多い場合は、CSS部分を重点的に出力すること。
<コード>
`,
// -------------------------------------------
  "数学": `<概要>
  
<詳細>
・
・

`
};

const SummaryInput = ({ value, onChange, selectedItem, setInputPrompt }) => {
    const template = summaryTexts[selectedItem];
    useEffect(() => {
      if (!value) {
        onChange({ target: { value: template } });
      }
    }, [selectedItem, value, onChange, template]);
  
    const handleInputChange = (e) => {
      onChange(e);
      setInputPrompt(e.target.value);
    };
  
    return (
      <ItemContainer>
        <div>
          <label>概要:</label>
        </div>
        <TextBox type="text" value={value} onChange={handleInputChange} />
      </ItemContainer>
    );
  };
  
  export default SummaryInput;
  
  const ItemContainer = styled.div`
    margin-bottom: 1rem;
    color: #eee;
  `;
  
  const TextBox = styled.textarea`
    width: 100%;
    height: 300px;
    padding: 1rem;
    margin: 1rem 0;
    border: none;
    background-color: #292929;
    color: #eee;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
        outline: none;
        box-shadow: 0px 0px 3px 3px #4f4f4f;
    }
`;
  

