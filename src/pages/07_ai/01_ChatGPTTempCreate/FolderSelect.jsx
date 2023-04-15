import React, { useState, useRef } from 'react';
import styled from "styled-components";

const FolderSelect = ({ onFolderDataChange }) => {
    const [folderData, setFolderData] = useState([]);
    const fileInput = useRef(null);

    const handleFolderSelect = (event) => {
        const files = event.target.files;
        if (files.length === 0) {
          return;
        }
        // フォルダデータを初期化する
        setFolderData([]);
        onFolderDataChange([]);

        const newFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            let isDuplicate = false;
            let duplicateIndex = -1;
      
            for (let j = 0; j < folderData.length; j++) {
              if (folderData[j].name === file.name) {
                isDuplicate = true;
                duplicateIndex = j;
                break;
              }
            }
            if (isDuplicate) {
              // 古いデータを削除
              folderData.splice(duplicateIndex, 1);
            }
            newFiles.push(file);
          }
        if (newFiles.length === 0) {
          return;
        }
      
        const handleNextFile = (fileIndex) => {
          if (fileIndex < newFiles.length) {
            const file = newFiles[fileIndex];
            const reader = new FileReader();
            reader.onload = (e) => {
              updateFolderData((prevData) => [
                ...prevData,
                { name: file.name, content: e.target.result.split('\n') },
              ]);
              handleNextFile(fileIndex + 1);
            };
            reader.readAsText(file);
          }
        };
      
        handleNextFile(0);
      };

  const resetFileInput = () => {
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };
  const updateFolderData = (newData) => {
    setFolderData(newData);
    onFolderDataChange(newData);
  };
  return (
    <FolderContainer>
      <InputContainer type="file" ref={fileInput} onClick={resetFileInput} onChange={handleFolderSelect} multiple />
      {folderData.map((file, fileIndex) => (
        <FileContainer key={fileIndex}>
          <h4>{file.name}</h4>
          {file.content.map((item, index) => (
            <div key={`${fileIndex}-${index}`}>
              {item}
            </div>
          ))}
        </FileContainer>
      ))}
    </FolderContainer>
  );
};

export default FolderSelect;

const FolderContainer = styled.div`
    margin-top: 1rem;
`;

const InputContainer = styled.input`
    border-radius: 5px;
    color: transparent;
    &:hover {
      cursor: pointer;
    }
    &::-webkit-file-upload-button {
      visibility: hidden;
    }
    &::before {
      content: "ファイルを選択";
      display: inline-block;
      background: #292929;
      color: white;
      border-radius: 5px;
      padding: 8px 16px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      cursor: pointer;
    }
`;

const FileContainer = styled.div`
  margin-top: 1rem;
  background-color: #292929;
  color: white;
  padding: 4px 16px;
  border-radius: 10px;
`;

