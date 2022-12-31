import React, { useState } from 'react'
import styled from "styled-components";

const MotionRec = () => {
  const [accelerationX, setAccelerationX] = useState(0);
  const [accelerationY, setAccelerationY] = useState(0);
  const [accelerationZ, setAccelerationZ] = useState(0);

  const deviceMotionRequest = () => {
    if (DeviceMotionEvent.requestPermission) {
      DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener("devicemotion", (event) => {
              if (!event.accelerationIncludingGravity) {
                alert('event.accelerationIncludingGravity is null');
                return;
              }

            })
          }
        })
        .catch(console.error);
    } else {
      alert('DeviceMotionEvent.requestPermission is not found')
    }
  }
  
  const getMotion = (event) => {
    setAccelerationX(event.accelerationIncludingGravity.x)
    setAccelerationY(event.accelerationIncludingGravity.y)
    setAccelerationZ(event.accelerationIncludingGravity.z)
  }
  
  return (
    <div>MotionRec
      <input type="button" id="permit" value="SafariでDeviceOrientationを許可"/>
      <Chart1Canvas id="mychart1" ></Chart1Canvas>
      <Chart2Canvas id="mychart2" ></Chart2Canvas>
      <div id="cdiv">button
        <Chart3Canvas id="mycanvas"></Chart3Canvas>
        
      </div>
      <button onClick={deviceMotionRequest}>A</button>
      <button onClick={getMotion}>B</button>
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

// html, body{
//   text-align: center;
//   background-color: #fafafa;
//   font-size: 20px;
//   color: #333;
// }
// body{
//   background-color: #ffffcc;
// }
// #mycanvas{
//   border: 1px solid #333;
//   background-color: #ffcccc;
// }
