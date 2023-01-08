import React, { useState } from 'react'
import styled from "styled-components";

const MotionRec = () => {
  const [recStart, setRecStart] = useState("false")
  const [motionData, setMotionData] = useState([1,2,3])
  let motionDataTemp = []

  const clickRequestDeviceSensor = () => {
    //. ユーザーに「許可」を明示させる必要がある
    DeviceMotionEvent.requestPermission().then( function( response ){
      if( response === 'granted' ){window.addEventListener( "devicemotion", deviceMotion )}
    }).catch( function( e ){console.log( e )})
  }


  const [accelerationX, setAccelerationX] = useState(0);
  const [accelerationY, setAccelerationY] = useState(0);
  const [accelerationZ, setAccelerationZ] = useState(0);

  const deviceMotion = ( e ) => {
    e.preventDefault();
    if( recStart === "true" ){
      const ac = e.acceleration;
      const motion = {};
      motion['ac'] = ac;
      motionDataTemp.push( motion );

      setAccelerationX(e.acceleration.x)
      setAccelerationY(e.acceleration.y)
      setAccelerationZ(e.acceleration.z)
      // setMotionData(motionDataTemp);
    }
  }



  const recording = () => {
    setMotionData([])
    setRecStart("true")
  }

  const consoleOut = () => {
    console.log(motionData)
  }

  return (
    <DivMain>MotionRec
      <button onClick={clickRequestDeviceSensor}>アクセスを許可</button>
      <button onClick={deviceMotion}>device motion</button>
      <button onClick={recording}>rec</button>
      <button onClick={consoleOut}>console</button>
      <p>{recStart}</p>
      <p>{accelerationX}</p>
    </DivMain>
  )
}

export default MotionRec

const DivMain = styled.div`
  color: white;
`