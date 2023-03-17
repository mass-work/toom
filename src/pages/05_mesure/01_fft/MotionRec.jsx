import React, { useState, useEffect } from "react";


// import styled from "styled-components";

// 加速度を取得する関数コンポーネントを定義する
const MotionRec = (props) => {
  const aDP = 100
  const timeDP = 1000
  const measurementTime = 20000
  // useStateフックで加速度のデータを管理する
  const [data, setData] = useState([]); // データの初期値は空の配列
  // useStateフックでボタンの状態を管理する
  const [button, setButton] = useState(false); // ボタンの初期値はfalse
  // useEffectフックでモーションセンサーのイベントリスナーを登録する
  useEffect(() => {
    const handleDeviceMotion = (event) => {     // イベントハンドラを定義する
      const { x, y, z } = event.acceleration;   // イベントオブジェクトから加速度を取得する
      setData((prevData) => {                   // データに加速度を追加する
        if (prevData.length >= props.samplingPoints) { prevData.shift() } // データが1024点に達したら、先頭の要素を削除する
        // 時間軸を0スタートとする処理
        const msec = Math.round(performance.now() * timeDP) / timeDP / 1000;
        const diff = prevData.length > 0 ? Math.round((msec - prevData[0].msec) * timeDP) / timeDP : 0;
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

  props.setData(data)
  // JSXで画面に表示する内容を返す
  return (
    <div>

      <button onClick={handleClick}>{ button ? "停止" : "開始"}</button>

     </div>
  );
};

// 加速度を取得する関数コンポーネントをエクスポートする
export default MotionRec;
