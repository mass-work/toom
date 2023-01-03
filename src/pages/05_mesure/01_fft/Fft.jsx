import React, { useState } from 'react'
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis } from 'recharts';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const expi = (theta) => {return [Math.cos(theta), Math.sin(theta)]}
const iadd = ([ax, ay], [bx, by]) => {return [ax + bx, ay + by]}
const isub = ([ax, ay], [bx, by]) => {return [ax - bx, ay - by]}
const imul = ([ax, ay], [bx, by]) => {return [ax * bx - ay * by, ax * by + ay * bx]}

const fftrec = (c, T, N, s = 0, w = 1) => {
    if (N === 1) return [c[s]];
    const Nh = N / 2, Td = T * 2, wd = w * 2;
    const rec = fftrec(c, Td, Nh, s, wd).concat(fftrec(c, Td, Nh, s + w, wd));
    for (let i = 0; i < Nh; i++) {
        const l = rec[i], re = imul(rec[i + Nh], expi(T * i));
        [rec[i], rec[i + Nh]] = [iadd(l, re), isub(l, re)];
    }
    return rec;
}
const fft0 = (f) => {
    const N = f.length, T = -2 * Math.PI / N;
    return fftrec(f, T, N);
}
// const ifft0 = (F) => {
//     const N = F.length, T = 2 * Math.PI / N;
//     return fftrec(F, T, N).map(([r, i]) => [r / N, i / N]);
// }

const N = 2 ** 10
const sinFrq = 125
let sinWave = []
for (var j = 0; j < N; j++) {
    sinWave.push(Math.sin(Math.PI * 2 / 1000 * j * sinFrq));
}

const fr0 = sinWave;
const f0 = fr0.map(r => [r, 0]);
const F = fft0(f0);
// const f1 = ifft0(F);
// const fr1 = f1.map(([r]) => r);
const amp = F.map(amp => Math.abs(amp[1])/ N * 2 )

const data = []
for (var i = 0; i < N; i++) {
    var dataTmp = {};
    // [{x:*, y:*, z:*}]の連想配列を作る
    dataTmp.x = i / 1000;
    dataTmp.y = sinWave[i];
    dataTmp.z = i ** i;
    // 連想配列を配列に追加していく
    data.push(dataTmp);
}
const frqData = 150
const dataFft = []
for (var k = 0; k < frqData; k++) {
    var dataFftTmp = {};
    // [{x:*, y:*, z:*}]の連想配列を作る
    dataFftTmp.frq = 1 / 0.001 / N * k
    dataFftTmp.amp = amp[k]
    // 連想配列を配列に追加していく
    dataFft.push(dataFftTmp);
}

// console.log("fr0:", fr0);
// console.log("F:", F.map(amp => amp[0]));
// console.log("f1:", f1);
// console.log("fr1:", fr1);// console.log(amp)console.log(N)
// console.log(1/1000*N)
// console.log(1/1000*N/10)
// console.log(1/(1/1000*N/10))

const Fft = () => {
    const [accelerationX, setAccelerationX] = useState(0);
    const [accelerationY, setAccelerationY] = useState(0);
    const [accelerationZ, setAccelerationZ] = useState(0);
  
    // センサーにアクセス-------------------------------
    const deviceMotionRequest = () => {
      // osを確認
      const detectOSSimply = () => {
        let ret;
        if (navigator.userAgent.indexOf("iPhone") > 0 || navigator.userAgent.indexOf("iPad") > 0 || navigator.userAgent.indexOf("iPod") > 0) {
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
    // ------------------------------------------------------------
  
    const [recData, setRecData] = useState('');
  
    const [fs, setFs] = useState('');
    const fsHandleChange = (event) => {setFs(event.target.value);};
    const [sp, setSp] = useState('');
    const spHandleChange = (event) => {setSp(event.target.value);};
    const [timer, setTimer] = useState('');
    const timerHandleChange = (event) => {setTimer(event.target.value);};
    const nyquistFreq = 2.56
  
    const recStart = async() => {
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

      let recPlotData = []
      if (sp > 0){
        for (let l = 0; l < sp; l++) {
            let recDataTmp = {};
            // [{x:*, y:*, z:*}]の連想配列を作る
            recDataTmp.time = getTime[l]
            recDataTmp.xAmp = getX[l]
            recDataTmp.yAmp = getY[l]
            recDataTmp.zAmp = getZ[l]
            // 連想配列を配列に追加していく
            recPlotData.push(recDataTmp);
        }
      }
      return recPlotData
      // console.log(sp)
      // console.log(recPlotData)
    }
    return (
    <div>
        <LineChart width={400} height={400} data={data}>
            <XAxis dataKey="x" name="time" />
            <YAxis />
            <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
        </LineChart>

        <LineChart width={400} height={400} data={dataFft}>
            <XAxis dataKey="frq" name="frq" />
            <YAxis />
            <Line type="monotone" dataKey="amp" stroke="#8884d8" dot={false} />
        </LineChart>

        <LineChart width={400} height={400} data={recData}>
            <XAxis dataKey="Time" name="Time" />
            <YAxis />
            <Line type="monotone" dataKey="xAmp" stroke="#8884d8" dot={false} />
            {/* <Line type="monotone" dataKey="yAmp" stroke="#84d8b1" dot={false} />
            <Line type="monotone" dataKey="zAmp" stroke="#d0d884" dot={false} /> */}
        </LineChart>

        {/* <input type="button" id="permit" value="SafariでDeviceOrientationを許可"/> */}
        <button onClick={deviceMotionRequest}>A</button>
        <div>{accelerationX}</div>
        <div>{accelerationY}</div>
        <div>{accelerationZ}</div>
        <button onClick={() => setRecData(recStart)}>rec開始</button>

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

export default Fft


const StyledSelect = styled(Select)`
  background-color: white;
`