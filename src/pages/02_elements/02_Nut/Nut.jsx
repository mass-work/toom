import React from 'react';
import styled from 'styled-components';
import { Canvas, useLoader } from 'react-three-fiber'
import NutTable from './NutTable';
// import { PerspectiveCamera } from 'three'; // 追加
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';



function Nut() {
  const geometry = useLoader(STLLoader, "./Nut.stl");
  return (
    <AppContainer>
      <Canvas>
        <mesh geometry={geometry}>
          <meshBasicMaterial color={0xffffff} />
        </mesh>
      </Canvas>
      <NutTable />
    </AppContainer>
  );
}

export default Nut;

const AppContainer = styled.div`
/* background-color: white; */
  padding: 5% 5%;
`;
