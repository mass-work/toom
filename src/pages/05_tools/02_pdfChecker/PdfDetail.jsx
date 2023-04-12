import React from 'react';
import styled from 'styled-components';

const PdfDetailWrapper = styled.div`
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  padding: 8px;
  margin-bottom: 8px;
`;

const PdfDetail = ({ pdf }) => {
  return (
    <PdfDetailWrapper>
      <h4>{pdf.file.name}</h4>
      <p>ページ数: {pdf.numPages}</p>
    </PdfDetailWrapper>
  );
};

export default PdfDetail;
