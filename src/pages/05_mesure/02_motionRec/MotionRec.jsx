import React, { useState } from 'react'
import styled from "styled-components";
// import useInterval from './components/UseInterval';

const MotionRec = () => {
  const [accelerationX, setAccelerationX] = useState(0);
  const [accelerationY, setAccelerationY] = useState(0);
  const [accelerationZ, setAccelerationZ] = useState(0);

  const deviceMotionRequest = () => {
    // osを確認
    function detectOSSimply() {
      let ret;
      if (
          navigator.userAgent.indexOf("iPhone") > 0 ||
          navigator.userAgent.indexOf("iPad") > 0 ||
          navigator.userAgent.indexOf("iPod") > 0
      ) {
          ret = "iphone";   // iPad OS13のsafariはデフォルト「Macintosh」なので別途要対応
      } else if (navigator.userAgent.indexOf("Android") > 0) {
          ret = "android";
      } else {
          ret = "pc";
      }
      return ret;
    }
    const os = detectOSSimply();
    if (os === "iphone") {
      // osがiosの場合にセンサーにアクセス
      if (DeviceMotionEvent.requestPermission) {
        DeviceMotionEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              window.addEventListener("devicemotion", (event) => {
                if (!event.accelerationIncludingGravity) {
                  alert('event.accelerationIncludingGravity is null');
                  return;
                }
                setAccelerationX(event.accelerationIncludingGravity.x)
                setAccelerationY(event.accelerationIncludingGravity.y)
                setAccelerationZ(event.accelerationIncludingGravity.z)
              })
            }
          })
          .catch(console.error);
      } else {
        alert('DeviceMotionEvent.requestPermission is not found')
      }
    } else if (os === "android") {
        window.alert("android未対応")
    } else{
        window.alert("PC未対応");
    }
  }

  const startData = Date.now()
  const smpTime = 500
  const N = 2 ** 2
  let getTime = []
  let getX = []
  let getY = []
  let getZ = []
  for (let i = 0; i < N; i++) {
    let countTime = Date.now()
    do{} while (Date.now() - countTime < smpTime)
    console.log(Date.now()-startData)
    getTime.push(Date.now()-startData)
    getX.push(accelerationX)
    getY.push(accelerationY)
    getZ.push(accelerationZ)
  }
  console.log(getTime)
 
  return (
    <div>MotionRec
      <input type="button" id="permit" value="SafariでDeviceOrientationを許可"/>
      <Chart1Canvas id="mychart1" ></Chart1Canvas>
      <Chart2Canvas id="mychart2" ></Chart2Canvas>
      <div id="cdiv">button
        <Chart3Canvas id="mycanvas"></Chart3Canvas>
        
      </div>
      <button onClick={deviceMotionRequest}>A</button>
      <div>{accelerationX}</div>
      <div>{accelerationY}</div>
      <div>{accelerationZ}</div>
      <div>{getTime}</div>
      <div>{getX}</div>
      <div>{getY}</div>
      <div>{getZ}</div>
    </div>
  )
}

export default MotionRec

const Chart1Canvas = styled.canvas`
  background-color: red;
`
const Chart2Canvas = styled.canvas`
background-color: blue;
`
const Chart3Canvas = styled.canvas`
  background-color: yellow;
  width: 500px;
  height: 250px;
`