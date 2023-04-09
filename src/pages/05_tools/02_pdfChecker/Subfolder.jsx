import React from 'react';
import styled from 'styled-components';

const SubfolderWrapper = styled.div`
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  padding: 8px;
  margin-bottom: 8px;
`;

const Subfolder = () => {
  const pdfs = []; // サブフォルダ内のPDFデータを格納する配列

  return (
    <SubfolderWrapper>
      {/* サブフォルダ内のPDFリストを表示 */}
    </SubfolderWrapper>
  );
};

export default Subfolder;
