import React from 'react';
import styled from 'styled-components';
import NutTable from './NutTable';
import ModelViewer from './ModelViewer';

function Nut() {
  return (
    <MeinContainer>
      <TableContainer>
        <NutTable />
      </TableContainer>
      <ModelContainer>
        <ModelViewer />
      </ModelContainer>
    </MeinContainer>
);
}

export default Nut;
const MeinContainer = styled.div`
  margin: 1% 5% 0% 5%;
  /* padding: 1%; */
  display: flex;
  flex-direction: row; /* 行方向に配置 */
`
const TableContainer = styled.div`
  background-color: #d2e67c;
  padding: 2% 1% 2% 1%;
  flex: 1; /* 残りのスペースを占有 */
`;
const ModelContainer = styled.div`
  background-color: white;
  padding: 2% 1% 0% 1%;
  height: 40vh;
  width: 40vw;
`;
