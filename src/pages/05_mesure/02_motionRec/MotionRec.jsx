import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// 加速度を取得する関数コンポーネントを定義する
const MotionRec = () => {
  // let msec = [];
  const [outData, setOutData] = useState([]);
  // useStateフックで加速度のデータを管理する
  const [data, setData] = useState([]); // データの初期値は空の配列
  // useStateフックでボタンの状態を管理する
  const [button, setButton] = useState(false); // ボタンの初期値はfalse
  // useEffectフックでモーションセンサーのイベントリスナーを登録する
  useEffect(() => {
    const handleDeviceMotion = (event) => {     // イベントハンドラを定義する
      const { x, y, z } = event.acceleration;   // イベントオブジェクトから加速度を取得する
      const msec = performance.now();
      setData((prevData) => {                   // データに加速度を追加する
        if (prevData.length >= 10) { prevData.shift() } // データが1024点に達したら、先頭の要素を削除する
        // if (prevData.length >= 10) { 
          // setButton((prevButton) => !prevButton);
          // return;
        //  } // データが1024点に達したら、先頭の要素を削除する
        return [...prevData, {msec, x, y, z}];      // データの末尾に加速度を追加する
        // return [...prevData, msec];      // データの末尾に加速度を追加する
      });
    };
    
    // ボタンの状態に応じて、モーションセンサーのイベントリスナーを登録したり解除したりする
    if (button) {
      // ボタンがtrueなら、イベントリスナーを登録する
      //. ユーザーに「許可」を明示させる必要がある
      DeviceMotionEvent.requestPermission().then( function( response ){
        if( response === 'granted' ){
          // window.addEventListener( "devicemotion", handleDeviceMotion );
          window.addEventListener("devicemotion", handleDeviceMotion, { frequency: 100 });
        }
      }).catch( function( e ){console.log( e )})
    } else {
      // ボタンがfalseなら、イベントリスナーを解除する
      window.removeEventListener("devicemotion", handleDeviceMotion);
    }
    // クリーンアップ関数を返す
    return () => {
      // モーションセンサーのイベントリスナーを解除する
      window.removeEventListener("devicemotion", handleDeviceMotion);
    };
  }, [button]); // 依存配列にボタンの状態を入れる
  
  // ボタンをクリックしたときのイベントハンドラを定義する
  const handleClick = () => {
    // setButton関数でボタンの状態を反転する
    setButton((prevButton) => !prevButton);
  };

  const refreshData = () => {
    setOutData(JSON.stringify(data))
  }



  // JSXで画面に表示する内容を返す
  return (
    <div>
      {/* <p>加速度のデータ: {JSON.stringify(data)}</p> */}
      <button onClick={refreshData}>refresh</button>
      {/* <button onClick={handleDeviceMotion}>refresh</button> */}
      <p>out1:{outData}</p>
      <button onClick={handleClick}>{button ? "停止" : "開始"}</button>
    </div>
  );
};

// 加速度を取得する関数コンポーネントをエクスポートする
export default MotionRec;
