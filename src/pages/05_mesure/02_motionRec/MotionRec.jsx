import React, { useState } from 'react'
import styled from "styled-components";

const MotionRec = () => {
  const [recStart, setRecStart] = useState("false")
  const [motionData, setMotionData] = useState([0])
  
  const clickRequestDeviceSensor = () => {
    //. ユーザーに「許可」を明示させる必要がある
    DeviceMotionEvent.requestPermission().then( function( response ){

      if( response === 'granted' ){
        // let motionDataTemp = [] 
        // for (let i = 0; i < 6; i++) {
        //   let countTime = performance.now()
        //   while (performance.now() - countTime < 100){}
          window.addEventListener( "devicemotion", deviceMotion )
          // motionDataTemp.push(Math.round(accelerationX * 100) / 100)
        // }
      // setMotionData(motionDataTemp)
      }


    }).catch( function( e ){console.log( e )})
  }

  const [accelerationX, setAccelerationX] = useState(0);
  const [accelerationY, setAccelerationY] = useState(0);
  // const [accelerationZ, setAccelerationZ] = useState(0);

  const deviceMotion = ( e ) => {
    console.log(recStart)
    e.preventDefault();
    if( recStart === "true" ){
      setAccelerationX(e.acceleration.x)
      // let countTime = performance.now()
      // while (performance.now() - countTime < 100){}
      setAccelerationY(e.acceleration.x)
      // motionDataTemp.push(Math.round(e.acceleration.x * 100) / 100)
      // const ac = e.acceleration;
      // const motion = {};
      // motion['ac'] = ac;
      // motionDataTemp.push( motion );

      // setAccelerationZ(e.acceleration.z)

      // setMotionData(motionDataTemp);
    }
  }



  const recording = () => {
    setMotionData([])
    setRecStart("true")
  }


  return (
    <DivMain>
      <div>
       <button onClick={clickRequestDeviceSensor}>アクセスを許可</button>
      </div>
      <div>
        <button onClick={deviceMotion}>device motion</button>
      </div>
      <div>
        <button onClick={recording}>rec</button>
      </div>
      <p>{recStart}</p>
      <p>{accelerationX}</p>
      <p>{accelerationY}</p>
      <p>{motionData}</p>
    </DivMain>
  )
}

export default MotionRec

const DivMain = styled.div`
  color: white;
`