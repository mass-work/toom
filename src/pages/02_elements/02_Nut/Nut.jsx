import React from 'react';
import styled from 'styled-components';
import NutTable from './NutTable';

const AppContainer = styled.div`
  padding: 5% 5%;
`;

function App() {
  return (
    <AppContainer>
      <NutTable />
    </AppContainer>
  );
}

export default App;
