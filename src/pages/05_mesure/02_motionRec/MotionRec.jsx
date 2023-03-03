import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis } from 'recharts';
// import styled from "styled-components";

// 加速度を取得する関数コンポーネントを定義する
const MotionRec = () => {
  const aDP = 100
  const timeDP = 1000
  const measurementTime = 20000
  const [outData, setOutData] = useState([]);
  // useStateフックで加速度のデータを管理する
  const [data, setData] = useState([]); // データの初期値は空の配列
  // useStateフックでボタンの状態を管理する
  const [button, setButton] = useState(false); // ボタンの初期値はfalse
  // useEffectフックでモーションセンサーのイベントリスナーを登録する
  useEffect(() => {
    const handleDeviceMotion = (event) => {     // イベントハンドラを定義する
      const { x, y, z } = event.acceleration;   // イベントオブジェクトから加速度を取得する
      // const msec = Math.round(performance.now() * timeDP) / timeDP / 1000;
      setData((prevData) => {                   // データに加速度を追加する
        if (prevData.length >= 1024) { prevData.shift() } // データが1024点に達したら、先頭の要素を削除する
        // 時間軸を0スタートとする処理
        const msec = Math.round(performance.now() * timeDP) / timeDP / 1000;
        const diff = prevData.length > 0 ? msec - prevData[0].msec : 0;
        // const newData = prevData.map((d) => ({ ...d, msec: Math.round((d.msec - prevData[0].msec) * timeDP) / timeDP }));
        // return [...newData, { msec, diff, x: Math.round(x * aDP) / aDP, y: Math.round(y * aDP) / aDP, z: Math.round(z * aDP) / aDP }];
        // return [...prevData, {msec, x: Math.round(x * aDP) / aDP, y: Math.round(y * aDP) / aDP, z: Math.round(z * aDP) / aDP}];
        return [...prevData, {msec, diff, x: Math.round(x * aDP) / aDP, y: Math.round(y * aDP) / aDP, z: Math.round(z * aDP) / aDP}];
      });
    };
    // ボタンの状態に応じて、モーションセンサーのイベントリスナーを登録したり解除したりする
    let timeoutId;
    if (button) {
      // ボタンがtrueなら、イベントリスナーを登録する
      //. ユーザーに「許可」を明示させる必要がある
      DeviceMotionEvent.requestPermission().then( function( response ){
        if( response === 'granted' ){
          window.addEventListener("devicemotion", handleDeviceMotion, { frequency: 10 });
        }
      }).catch( function( e ){console.log( e )})
      
      // 5秒後にボタンをfalseに変更する
      timeoutId = setTimeout(() => {
        setButton(false);
      }, measurementTime);


    } else {
      // ボタンがfalseなら、イベントリスナーを解除する
      window.removeEventListener("devicemotion", handleDeviceMotion);
      clearTimeout(timeoutId);
    }
    // クリーンアップ関数を返す
    return () => {
      // モーションセンサーのイベントリスナーを解除する
      window.removeEventListener("devicemotion", handleDeviceMotion);
      clearTimeout(timeoutId);
    };
  }, [button]); // 依存配列にボタンの状態を入れる
  
  // ボタンをクリックしたときのイベントハンドラを定義する
  const handleClick = () => {
    // setButton関数でボタンの状態を反転する
    setData([]);
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

      <LineChart width={400} height={400} data={data}>
          <XAxis dataKey="diff" name="msec" />
          <YAxis />
          <Line type="monotone" dataKey="x" stroke="#8884d8" dot={false} />
          <Line type="monotone" dataKey="y" stroke="#84d8b8" dot={false} />
          <Line type="monotone" dataKey="z" stroke="#c2d884" dot={false} />
      </LineChart>

    </div>
  );
};

// 加速度を取得する関数コンポーネントをエクスポートする
export default MotionRec;
