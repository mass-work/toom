import React from 'react';
import styled from 'styled-components';

const DrawerContainer = styled.div`
  flex: 1;
  padding: 16px;
  background-color: #f0f0f0;
`;

const Drawer = ({ pdfs, setPdfs }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newPdf = {
          id: Date.now(), // 一意のIDを設定
          file: file,
          data: reader.result
        };
        setPdfs([...pdfs, newPdf]);
      };
      reader.readAsDataURL(file);
    }
    // アップロード後にinputタグをリセット
    event.target.value = null;
  };

  return (
    <DrawerContainer>
      <h3>PDFファイルをアップロード</h3>
      <input type="file" accept=".pdf" onChange={handleFileUpload} />
    </DrawerContainer>
  );
};

export default Drawer;
