import React, { useState } from 'react';
import styled from "styled-components";
import ItemSelect from './ItemSelect';
import SummaryInput from './SummaryInput';
import CopyButton from './CopyButton';
import FolderSelect from './FolderSelect';

const ChatGPTTempCreate = () => {
  const [folderData, setFolderData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("プログラミング(コード修正)");
  const [summaryText, setSummaryText] = useState("");
  const [inputPrompt, setInputPrompt] = useState("");
  
  const handleCopyClick = () => {
    const textToCopy = [
      inputPrompt,
      folderData.map((file) => `${file.name}\n${file.content.join('\n')}`)
    ].join('\n\n');
    
    navigator.clipboard.writeText(textToCopy).then(() => {
    //   setInputPrompt('');
    });
  };
  
  const handleItemSelect = (e) => {
    setSelectedItem(e.target.value);
    setSummaryText("");
  };

  return (
    <AppContainer>
      <Title>プロンプトformatter</Title>
      <FormContainer>
        <FormItemContainer>
            <ItemSelect value={selectedItem} onChange={handleItemSelect} />
            <SummaryInput value={summaryText} setInputPrompt={setInputPrompt}
                onChange={(e) => setSummaryText(e.target.value)}
                selectedItem={selectedItem}
            />
        <CopyButton onClick={handleCopyClick} />
        <FolderSelect onFolderDataChange={setFolderData} />
        </FormItemContainer>
      </FormContainer>
    </AppContainer>
  );
};

export default ChatGPTTempCreate;

// 以下、スタイルコンポーネントの定義

const AppContainer = styled.div`
  background-color: rgb(20, 20, 20);
  color: rgb(210, 210, 210);
  padding: 5px;
  height: 100%;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #eee;
  text-align: center;
  margin-bottom: 1rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormItemContainer = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  max-width: 600px;
`;

