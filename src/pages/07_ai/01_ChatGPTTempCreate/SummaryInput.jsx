import React, { useEffect } from 'react';
import styled from "styled-components";

const summaryTexts = {
// -------------------------------------------
"プログラミング(修正)": `<概要>
プログラムの修正をして下さい。
<言語/フレームワーク>
・コードから推定
<修正/追加項目>
・
・
<出力要件>
・プログラムはコードビューで出力すること。
・各プログラム毎にコードビューは分割して出力すること。
・出力が多い場合は、コードビューを重点的に出力すること。
<エラー>
<コード>
`,
// -------------------------------------------
"プログラミング(作成)": `<概要>
プログラムの作成をして下さい。
<言語/フレームワーク>
・
<機能>
・
・
<出力要件>
・各プログラム毎にコードビューは分割して出力すること。
・出力が多い場合は、コードビューを重点的に出力すること。
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
数学の問題について解説してください。
<問題>
・〇〇の解き方を教えて
<出力項目>
・[解説]
・[例題]
・[参考資料]
・[補足]
`,
// -------------------------------------------
"質問": `<概要>
・
<質問の背景>
・
<試したこと>
・〇〇で調べてみた/聞いてみた
<期待する回答>
・
`,
// -------------------------------------------
"メール": `<概要>
メールのテンプレートを作成して下さい。
<内容>
・〇〇について
<送信相手との関係>
・
<フォーマット>
挨拶文
本文
結び
<出力要件>
・フォーマットの項目、コメントはメールの本文中に記載しない。
`,
// -------------------------------------------
"レポート": `<概要>
〇〇についてレポートを作成して下さい。
<出力形式>
[タイトル]
[目次]
  1.
  2.
  3.
[本文]
  1. セクション
    ・
    ・
  2. セクション
    ・
    ・
[結論]
 ・
 ・
[参考文献]
 ・
`,
// -------------------------------------------
"リサーチ": `<概要>
調査対象について調べたのち、文章にまとめて下さい。
<調査対象>
・〇〇について
<出力形式>
[結論]
・
・
[調査結果]
1. 結果
    ・
    ・
2. 結果
    ・
    ・
[分析・考察]
・
[参考資料]
・
`,
// -------------------------------------------
"会話": `<シチュエーション>
・
・
<登場人物>
・
・
<会話>
A: 
B: 
A: 
B: 
A: 
B: 
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
  

