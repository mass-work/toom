import React, { useState, useEffect } from "react";
import styled from "styled-components";

// 加速度を取得する関数コンポーネントを定義する
const MotionRec = () => {
  const [outData, setOutData] = useState([]);
  // useStateフックで加速度のデータを管理する
  const [data, setData] = useState([]); // データの初期値は空の配列
  // useStateフックでボタンの状態を管理する
  const [button, setButton] = useState(false); // ボタンの初期値はfalse
  // useEffectフックでモーションセンサーのイベントリスナーを登録する
  useEffect(() => {
    const handleDeviceMotion = (event) => {     // イベントハンドラを定義する
      const { x, y, z } = event.acceleration;   // イベントオブジェクトから加速度を取得する
      const unixTime = Date.now()
      setData((prevData) => {                   // データに加速度を追加する
        // if (prevData.length >= 10) { prevData.shift() } // データが1024点に達したら、先頭の要素を削除する
        if (prevData.length >= 10) { 
          // setButton((prevButton) => !prevButton);
          return;
         } // データが1024点に達したら、先頭の要素を削除する
        return [...prevData, { unixTime, x, y, z }];      // データの末尾に加速度を追加する
      });
    };
    
    // ボタンの状態に応じて、モーションセンサーのイベントリスナーを登録したり解除したりする
    if (button) {
      // ボタンがtrueなら、イベントリスナーを登録する
      //. ユーザーに「許可」を明示させる必要がある
      DeviceMotionEvent.requestPermission().then( function( response ){
        if( response === 'granted' ){
          // window.addEventListener( "devicemotion", handleDeviceMotion );
          window.addEventListener("devicemotion", handleDeviceMotion, { frequency: 10 });
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
    console.log(data)
    setOutData(JSON.stringify(data))
  }


  // JSXで画面に表示する内容を返す
  return (
    <div>
      {/* <p>加速度のデータ: {JSON.stringify(data)}</p> */}
      <button onClick={refreshData}>refresh</button>
      <p>out{outData}</p>
      <button onClick={handleClick}>{button ? "停止" : "開始"}</button>
    </div>
  );
};

// 加速度を取得する関数コンポーネントをエクスポートする
export default MotionRec;

// ---------------------------------------------------

// import React, { useState } from 'react'
// import styled from "styled-components";

// const MotionRec = () => {
//   const [recStart, setRecStart] = useState("false")
//   const [motionData, setMotionData] = useState([0])
  
  // const clickRequestDeviceSensor = () => {
  //   //. ユーザーに「許可」を明示させる必要がある
  //   DeviceMotionEvent.requestPermission().then( function( response ){

  //     if( response === 'granted' ){
  //       // let motionDataTemp = [] 
  //       for (let i = 0; i < 6; i++) {
  //       //   let countTime = performance.now()
  //       //   while (performance.now() - countTime < 100){}
  //         window.addEventListener( "devicemotion", deviceMotion )
  //         // motionDataTemp.push(Math.round(accelerationX * 100) / 100)
  //       }
  //     // setMotionData(motionDataTemp)
  //     }


  //   }).catch( function( e ){console.log( e )})
  // }

//   const [accelerationX, setAccelerationX] = useState([]);
//   // const [accelerationY, setAccelerationY] = useState([]);
//   // const [accelerationZ, setAccelerationZ] = useState(0);

//   const deviceMotion = ( e ) => {
//     console.log(recStart)
//     e.preventDefault();
//     if( recStart === "true" ){
//       // for (let i = 0; i < 10; i++) {
//         setAccelerationX([...accelerationX, Math.round(e.acceleration.x * 10) / 10])
//       // }

//       // let countTime = performance.now()
//       // while (performance.now() - countTime < 100){}
//       // motionDataTemp.push(Math.round(e.acceleration.x * 100) / 100)
//       // const ac = e.acceleration;
//       // const motion = {};
//       // motion['ac'] = ac;
//       // motionDataTemp.push( motion );

//       // setAccelerationZ(e.acceleration.z)

//       // setMotionData(motionDataTemp);
//     }
//   }

//   const recording = () => {
//     setMotionData([])
//     setRecStart("true")
//   }

//   let testNum = 0
//   const test1 = (testNum) => {console.log(testNum)}

//   console.log(1)
//   setTimeout(() => test1(testNum), 1000)

//   for (let i = 0; i < 100; i++) {
//     let countTime = performance.now()
//     while (performance.now() - countTime < 100){}
//     testNum = testNum + 1
//   }
//   console.log(3)

//   return (
//     <DivMain>
//       <div>
//        <button onClick={clickRequestDeviceSensor}>アクセスを許可</button>
//       </div>
//       <div>
//         <button onClick={deviceMotion}>device motion</button>
//       </div>
//       <div>
//         <button onClick={recording}>rec</button>
//       </div>
//       <p>{recStart}</p>
//       <p>{accelerationX}</p>
//       <p>{motionData}</p>


//     </DivMain>
//   )
// }

// export default MotionRec

// const DivMain = styled.div`
//   color: white;
// `