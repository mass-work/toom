import React from 'react';
import { useLoader } from 'react-three-fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';


function StlViewer({ stlUrl }) {
  const stl = useLoader(STLLoader, stlUrl);
  stl.position.set(-10, 10, 10); // モデルをz軸方向に10ユニット移動する
  stl.scale.set(0.1, 0.1, 0.1); // モデルを10倍に拡大する
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const mesh = new THREE.Mesh(stl, material);

  return (
    <primitive object={mesh} />
  );
}

export default StlViewer;

