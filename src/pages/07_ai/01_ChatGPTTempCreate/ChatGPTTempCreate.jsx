import React, { useState } from 'react';
import styled from "styled-components";
import ItemSelect from './ItemSelect';
import SummaryInput from './SummaryInput';
import CopyButton from './CopyButton';
import FolderSelect from './FolderSelect';

const ChatGPTTempCreate = () => {
  const [folderData, setFolderData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("プログラミング(修正)");
  const [summaryText, setSummaryText] = useState("");
  const [inputPrompt, setInputPrompt] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const handleItemSelect = (e) => {
    setSelectedItem(e.target.value);
    setSummaryText("");
  };

  return (
    <AppContainer>
      <Title>
        <img src={process.env.PUBLIC_URL + '/formatterIcon.jpg'} alt="icon" />
        Formatter
      </Title>
      <FormContainer>
        <FormItemContainer>
            <ItemSelect value={selectedItem} onChange={handleItemSelect} />
            <SummaryInput value={summaryText} setInputPrompt={setInputPrompt}
                onChange={(e) => setSummaryText(e.target.value)}
                selectedItem={selectedItem}
            />
        <CopyButton inputPrompt={inputPrompt} summaryText={summaryText} folderData={folderData} setCopyStatus={setCopyStatus} />
        <CopyStatus>{copyStatus}</CopyStatus>
        <FolderSelect onFolderDataChange={setFolderData} />
        </FormItemContainer>
      </FormContainer>
    </AppContainer>
  );
};

export default ChatGPTTempCreate;

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
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-left: 0.5rem;
    height: 3rem;
    width: 3rem;
  }
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

const CopyStatus = styled.span`
  font-size: 1rem;
  margin-left: 1rem;
`;
