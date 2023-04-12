import React from 'react';
import styled from 'styled-components';

const FileListWrapper = styled.div`
  width: 250px;
  background-color: #f0f0f0;
  padding: 16px;
`;

const FileListTitle = styled.h3`
  margin: 0;
  margin-bottom: 8px;
`;

const FileListUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const FileListLi = styled.li`
  margin: 0;
  margin-bottom: 4px;
  font-size: 14px;
`;

const FileList = ({ pdfs }) => {
  return (
    <FileListWrapper>
      <FileListTitle>PDFファイル一覧</FileListTitle>
      <FileListUl>
        {pdfs.map((pdf) => (
          <FileListLi key={pdf.id}>{pdf.file.name}</FileListLi>
        ))}
      </FileListUl>
    </FileListWrapper>
  );
};

export default FileList;
