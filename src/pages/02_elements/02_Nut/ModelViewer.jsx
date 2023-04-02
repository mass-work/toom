import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import styled from "styled-components";

function ModelViewer() {
  const sceneRef = useRef(null);

  useEffect(() => {
    // シーンの作成
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#818181");

    // カメラの作成
    const camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      -window.innerHeight / 2,
      0.1,
      1000
    );
    camera.position.set(150, 210, 210); // カメラの位置
    camera.lookAt(0, 0, 0); // カメラの注視点

    // 光源の作成
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    // レンダラーの作成
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(sceneRef.current.clientWidth, sceneRef.current.clientHeight); // レンダラーのサイズを設定
    sceneRef.current.appendChild(renderer.domElement);

    // 3Dモデルの読み込み
    const loader = new GLTFLoader();
    loader.load(
      process.env.PUBLIC_URL + "/model.gltf", // モデルファイルのパス
      function (gltf) {
        const model = gltf.scene;
        model.scale.set(20, 20, 20); // モデルのスケールを設定
        scene.add(model);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    // カメラコントローラーの作成
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.target.set(0, 0, 0);

    // アニメーションの設定
    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }, []);



  return <ViewerContainer ref={sceneRef}></ViewerContainer>;
}

export default ModelViewer;

// 3Dモデルを表示するためのコンテナーのスタイル
const ViewerContainer = styled.div`
  width: 100%;
  height: 100%;
`;