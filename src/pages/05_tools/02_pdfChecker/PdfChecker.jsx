import React, { useState } from 'react';
import Desk from './Desk';
import Drawer from './Drawer';

const PdfChecker = () => {
  const [pdfs, setPdfs] = useState([]);

  const onPdfLoadSuccess = ({ numPages }, id) => {
    setPdfs(prevPdfs => prevPdfs.map(pdf => {
      if (pdf.id === id) {
        return { ...pdf, numPages };
      }
      return pdf;
    }));
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newPdf = {
          id: Date.now(), // 一意のIDを設定
          file: file,
          data: reader.result,
          numPages: null,
        };
        setPdfs([...pdfs, newPdf]);
      };
      reader.readAsDataURL(file);
    }
    // アップロード後にinputタグをリセット
    event.target.value = null;
  };
  
  return (
    <div>
      <Desk pdfs={pdfs} />
      <Drawer pdfs={pdfs} setPdfs={setPdfs} />
    </div>
  );
};

export default PdfChecker;

