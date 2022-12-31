import React, { useState } from 'react'
import styled from "styled-components";

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

  // const sleep = async() => {
  //     const date = new Date()
  //     console.log(date.getUTCMilliseconds())
  //     await new Promise(s => setTimeout(s, 200))
  //     console.log(date.getUTCMilliseconds())
  //   }
  // sleep()


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