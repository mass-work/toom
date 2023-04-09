import React from 'react';

const FileUploader = ({ onFileSelect }) => {
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileInput} />
    </div>
  );
};

export default FileUploader;
