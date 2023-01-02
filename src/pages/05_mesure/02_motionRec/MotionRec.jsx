import React, { useState } from 'react'
import styled from "styled-components";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

const MotionRec = (props) => {
  const [accelerationX, setAccelerationX] = useState(0);
  const [accelerationY, setAccelerationY] = useState(0);
  const [accelerationZ, setAccelerationZ] = useState(0);

  const deviceMotionRequest = () => {
    // osを確認
    const detectOSSimply = () => {
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

  const [recData, setRecData] = useState('');

  const [fs, setFs] = useState('');
  const fsHandleChange = (event) => {setFs(event.target.value);};
  const [sp, setSp] = useState('');
  const spHandleChange = (event) => {setSp(event.target.value);};
  const [timer, setTimer] = useState('');
  const timerHandleChange = (event) => {setTimer(event.target.value);};
  const nyquistFreq = 2.56

  const recStart = () => {
    let getTime = []
    let getTimeAcc = []
    let getX = []
    let getY = []
    let getZ = []
    const smpTime = 1 / fs / nyquistFreq * 1000
    const timerTime = timer * 1000
    const timerCount = performance.now()
    while (performance.now() - timerCount < timerTime){}
    let startData = performance.now() 
    for (let i = 0; i < sp; i++) {
      let countTime = performance.now()
      while (performance.now() - countTime < smpTime){}
      getTimeAcc.push((performance.now()-startData) / 1000)
      getTime.push(smpTime * i / 1000)
      getX.push(accelerationX)
      getY.push(accelerationY)
      getZ.push(accelerationZ)
    }
    return {getTimeAcc, getTime, getX, getY, getZ}
  }
  // console.log(recStart().getTime)
  // console.log(sp)
  props.setRecData(recData)
  props.setSp(sp)
  
  return (
    <div>MotionRec
      <input type="button" id="permit" value="SafariでDeviceOrientationを許可"/>
      <button onClick={deviceMotionRequest}>A</button>
      <div>{accelerationX}</div>
      <div>{accelerationY}</div>
      <div>{accelerationZ}</div>

      <button onClick={() => setRecData(recStart)}>
       rec開始
      </button>

      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="fs-select-label">サンプリング周波数(Hz)</InputLabel>
        <StyledSelect labelId="fs-select-label" id="fs-select" value={fs} label="fs" onChange={fsHandleChange}>
          <MenuItem value={100}>100Hz</MenuItem>
          <MenuItem value={500}>500Hz</MenuItem>
          <MenuItem value={1000}>1000Hz</MenuItem>
        </StyledSelect>
        </FormControl>

      <FormControl fullWidth>
        <InputLabel id="sp-select-label">サンプリング点数</InputLabel>
        <StyledSelect labelId="sp-select-label" id="sp-select" value={sp} label="sp" onChange={spHandleChange}>
          <MenuItem value={512}>512点</MenuItem>
          <MenuItem value={1024}>1024点</MenuItem>
          <MenuItem value={2048}>2048点</MenuItem>
        </StyledSelect>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="timer-select-label">タイマー(sec)</InputLabel>
        <StyledSelect labelId="timer-select-label" id="timer-select" value={timer} label="timer" onChange={timerHandleChange}>
          <MenuItem value={0}>0sec</MenuItem>
          <MenuItem value={1}>1sec</MenuItem>
          <MenuItem value={3}>3sec</MenuItem>
          <MenuItem value={5}>5sec</MenuItem>
          <MenuItem value={10}>10sec</MenuItem>
        </StyledSelect>
      </FormControl>

    </Box>
    </div>
  )
}

export default MotionRec
const StyledSelect = styled(Select)`
  background-color: white;
`
