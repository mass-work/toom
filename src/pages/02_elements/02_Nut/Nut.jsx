import React from 'react';
import styled from 'styled-components';
import NutTable from './NutTable';
import ModelViewer from './ModelViewer';

function Nut() {
  return (
    <div>
      <ModelContainer>
        <ModelViewer />
      </ModelContainer>
      <TableContainer>
        <NutTable />
      </TableContainer>
    </div>
);
}

export default Nut;

const ModelContainer = styled.div`
  /* background-color: white; */
  padding: 2% 5% 0% 5%;
  height: 80vh;
  width: 80vw;
`;
const TableContainer = styled.div`
/* background-color: #d2e67c; */
padding: 2% 5% 2% 5%;
`;
