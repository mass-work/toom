import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DeskIcon from '@mui/icons-material/Desk';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

const Drawer = ({ pdfs, setPdfs }) => {
  const [drawerPdfs, setDrawerPdfs] = React.useState([]);
  const idCounter = React.useRef(0);

  const generateId = () => {
    idCounter.current = idCounter.current + 1;
    return idCounter.current;
  };

  const handleFileUpload = (event) => {
    console.log(idCounter)
    const files = event.target.files;
    if (files) {
      const newPdfs = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        newPdfs.push(
          new Promise((resolve) => {
            reader.onload = () => {
              const newPdf = {
                id: generateId(),
                file: file,
                data: reader.result,
                numPages: null,
              };
              resolve(newPdf);
            };
          })
        );
      }
      newPdfs.reduce((acc, curr) => {
        return acc.then((pdfs) => {
          return curr.then((pdf) => {
            return [...pdfs, pdf];
          });
        });
      }, Promise.resolve([])).then((pdfs) => {
        setDrawerPdfs((prevDrawerPdfs) => [...prevDrawerPdfs, ...pdfs]);
      });
    }
    // アップロード後にinputタグをリセット
    event.target.value = null;
  };

  const handleClick = (pdf, fromDrawer) => {
    if (fromDrawer) {
      setDrawerPdfs((prevDrawerPdfs) => {
        const newDrawerPdfs = prevDrawerPdfs.filter((p) => p.id !== pdf.id);
        setPdfs((prevPdfs) => [...prevPdfs, pdf]);
        return newDrawerPdfs;
      });
    } else {
      setPdfs((prevPdfs) => {
        const newPdfs = prevPdfs.filter((p) => p.id !== pdf.id);
        setDrawerPdfs((prevDrawerPdfs) => [...prevDrawerPdfs, pdf]);
        return newPdfs;
      });
    }
  };

    return (
      <DrawerContainer>
        <div>
          <input type="file" accept=".pdf" onChange={handleFileUpload} multiple id="fileInput" style={{ display: 'none' }} />
          <label htmlFor="fileInput">
            <UpButton>
              <IconButton color="inherit" aria-label="upload PDF" component="span">
                <FolderOpenIcon />
                Upload
              </IconButton>
            </UpButton>
          </label>
        </div>
        <div>
          <label>
            <IconButton color="inherit" component="span" disabled="false">
              <SpanContainer>
                <DeskIcon />
                Desk
              </SpanContainer>
            </IconButton>
            
            <ul>
              {pdfs.map((pdf) => (
                <li key={pdf.id} onClick={() => handleClick(pdf, false)}>
                  {pdf.file.name}
                </li>
              ))}
            </ul>
          </label>
        </div>

        <div>
          <label>
            <IconButton color="inherit" component="span" disabled="false">
              <SpanContainer>
                <CorporateFareIcon />
                Shelf
              </SpanContainer>
            </IconButton>
            <ul>
              {drawerPdfs.map((pdf) => (
                <li key={pdf.id} onClick={() => handleClick(pdf, true)}>
                  {pdf.file.name}
                </li>
              ))}
            </ul>
          </label>
        </div>
      </DrawerContainer>
    );
  };
  
  export default Drawer;
  
  const DrawerContainer = styled.div`
    flex: 1;
    /* padding: 16px; */
    /* background-color: #d87d7d; */
    color: rgb(210, 210, 210);
  `;
  
const UpButton = styled.span`
border: 2px solid;
padding: 0px 0px 5px 0px;
border-radius: 15px;
`;  
const SpanContainer = styled.span`
color: rgb(210, 210, 210);
`;