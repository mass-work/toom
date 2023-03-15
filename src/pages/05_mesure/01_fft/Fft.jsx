import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { isMobile } from 'react-device-detect';
import MotionRec from './MotionRec'

// テスト用波形作成
const sinWaveCreate = () => {
  let [sinWaveX, sinWaveY, sinWaveZ] = [[], [], []];
  for (let j = 0; j < N; j++) {
    sinWaveX.push(Math.sin(Math.PI * 2 / (N-1) * j * sinFrq));
    sinWaveY.push(Math.sin(Math.PI * 2 * 2 / (N-1) * j * sinFrq + Math.PI));
    sinWaveZ.push(Math.sin(Math.PI * 2 * 4 / (N-1) * j * sinFrq + Math.PI * 1.5));
  }
  const data = []
  for (let i = 0; i < N; i++) {
      let dataTmp = {};
      // [{x:*, y:*, z:*}]の連想配列を作る
      dataTmp.time = i / 1000;
      dataTmp.x = sinWaveX[i];
      dataTmp.y = sinWaveY[i];
      dataTmp.z = sinWaveZ[i];
      // 連想配列を配列に追加していく
      data.push(dataTmp);
  }
  return data
}
const N = 2 ** 10
const sinFrq = 5
// const getWave = sinWaveCreate();

// 窓関数の計算
const windowFunc = (windowSize, windowType) => {
  const window = [];
  let corrWindowType = 2
  switch (windowType) {
    case 'rectangular':
      for (let i = 0; i < windowSize; i++) {
        window.push(1);
      }
      break;
    case 'hanning':
      corrWindowType = 2 / 0.5
      for (let i = 0; i < windowSize; i++) {
        window.push(0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (windowSize - 1)));
      }
      break;
    case 'hamming':
      corrWindowType = 2 / 0.54
      for (let i = 0; i < windowSize; i++) {
        window.push(0.54 - 0.46 * Math.cos((2 * Math.PI * i) / (windowSize - 1)));
      }
      break;
    case 'blackman':
      corrWindowType = 2 / 0.42
      for (let i = 0; i < windowSize; i++) {
        window.push(0.42 - 0.5 * Math.cos((2 * Math.PI * i) / (windowSize - 1)) + 0.08 * Math.cos((4 * Math.PI * i) / (windowSize - 1)));
      }
      break;
    default:
       for (let i = 0; i < windowSize; i++) {
        window.push(1);
      }
  }

  const windowWave = []
  for (let i = 0; i < windowSize; i++) {
      let dataTmp = {};
      // [{x:*, y:*, z:*}]の連想配列を作る
      dataTmp.time = i;
      dataTmp.window = window[i];
      // dataTmp.outWindowWave = window[i] * getWave[i];
      // 連想配列を配列に追加していく
      windowWave.push(dataTmp);
  }
  return [windowWave, corrWindowType];
}  

// FFTで使う関数
const expi = (theta) => {return [Math.cos(theta), Math.sin(theta)]} // 複素数の極座標表示に変換する関数
const iadd = ([ax, ay], [bx, by]) => {return [ax + bx, ay + by]}    // 2つの複素数を足し算する関数
const isub = ([ax, ay], [bx, by]) => {return [ax - bx, ay - by]}    // 2つの複素数を引き算する関数
const imul = ([ax, ay], [bx, by]) => {return [ax * bx - ay * by, ax * by + ay * bx]}  // 2つの複素数を掛け算する関数
const revBit = (k, n) => {
  let r = 0;
  for (let i = 0; i < k; i++) r = (r << 1) | ((n >>> i) & 1);
  return r;
};
const fftin1 = (c, T, N) => {
  const k = Math.log2(N);
  const rec = c.map((_, i) => c[revBit(k, i)]);
  for (let Nh = 1; Nh < N; Nh *= 2) {
      T /= 2;
      for (let s = 0; s < N; s += Nh * 2) {
          for (let i = 0; i < Nh; i++) {
              const l = rec[s + i], re = imul(rec[s + i + Nh], expi(T * i));
              [rec[s + i], rec[s + i + Nh]] = [iadd(l, re), isub(l, re)];
          }
      }
  }
  return rec;
};
const fft1 = (f) => {
  const N = f.length, T = -2 * Math.PI;
  return fftin1(f, T, N);
};
// const ifft1 = (F) => {
//   const N = F.length, T = 2 * Math.PI;
//   return fftin1(F, T, N).map(([r, i]) => [r / N, i / N]);
// };


  
const Fft = () => {
  const [sp, setSp] = useState('');
  const spHandleChange = (event) => {setSp(event.target.value);};
  const [timer, setTimer] = useState('');
  const timerHandleChange = (event) => {setTimer(event.target.value);};
  const [timeWaveData, setTimeWaveData] = useState([])
  // 加速度を取得する
  const getAccelerator = () => {
    isMobile ? setTimeWaveData(sinWaveCreate()) : setTimeWaveData(sinWaveCreate());
    console.log(isMobile ? "スマートフォンです。" : "PCです。");
  }

  const [window, setWindow] = useState('rectangular');
  const windowHandleChange = (event) => {setWindow(event.target.value);};
  const [windowWave, setWindowWave] = useState();
  const [corrWindowType, setCorrWindowType] = useState();
  // 窓関数の実行
  useEffect(() => {
    const [windowWave, corrWindowType] = windowFunc(timeWaveData.length, window)
    setCorrWindowType(corrWindowType)
    const timeWindowWave = []
    for (let i = 0; i < windowWave.length; i++) {
      let data = {};
      data.time = [i]/1000
      data.window = windowWave[i].window
      data.x = timeWaveData[i].x * windowWave[i].window
      data.y = timeWaveData[i].y * windowWave[i].window
      data.z = timeWaveData[i].z * windowWave[i].window
      timeWindowWave.push(data);
    }
    setWindowWave(timeWindowWave)
  }, [timeWaveData, window]);

  const [dataFft, setDataFft] = useState([]);
  // FFT実行
  const fftExe = () => {
    const [frX,frY,frZ] = [[],[],[]];
    const [imReal, imAginary] = [[], []];
    windowWave.forEach(({ x, y, z }) => [frX.push(x), frY.push(y), frZ.push(z)]);
    const [FX, FY, FZ] = [frX, frY, frZ].map(f => fft1(f.map(r => [r, 0])));
    [FX, FY, FZ].forEach(([re, im]) => ([imReal.push(re), imAginary.push(im)]));

    // // 振幅を計算する 
    // // 窓関数により値を変える必要がある。
    const [imRealX, imRealY, imRealZ] = [FX, FY, FZ].map(f => f.map(amp => amp[0]));
    const [imAginaryX, imAginaryY, imAginaryZ] = [FX, FY, FZ].map(f => f.map(amp => amp[1]));
    const [ampX,ampY,ampZ] = [[],[],[]]
    for (let i = 0; i < imRealX.length; i++) {
      ampX.push(Math.sqrt(Math.pow(imRealX[i],2)+Math.pow(imAginaryX[i],2))/N*corrWindowType)
      ampY.push(Math.sqrt(Math.pow(imRealY[i],2)+Math.pow(imAginaryY[i],2))/N*corrWindowType)
      ampZ.push(Math.sqrt(Math.pow(imRealZ[i],2)+Math.pow(imAginaryZ[i],2))/N*corrWindowType)
    }
    const frqData = 100
    const data = []
    for (let k = 0; k < frqData; k++) {
        let dataTmp = {};
        dataTmp.frq = 1 / 0.001 / N * k
        dataTmp.Xamp = ampX[k]
        dataTmp.Yamp = ampY[k]
        dataTmp.Zamp = ampZ[k]
        // 連想配列を配列に追加していく
        data.push(dataTmp);
    }
    setDataFft(data)
   }
    // // 逆変換
    // // const f1 = ifft1(F);
    // // const fr1 = f1.map(([r]) => r);
  return (
  <div>
    測定条件設定
    <Box sx={{ minWidth: 120 }}>
    <StyledFormControl>
        <InputLabel id="sp-select-label">サンプリング点数</InputLabel>
        <StyledSelect labelId="sp-select-label" id="sp-select" value={sp} label="sp" onChange={spHandleChange}>
        <MenuItem value={512}>512点</MenuItem>
        <MenuItem value={1024}>1024点</MenuItem>
        <MenuItem value={2048}>2048点</MenuItem>
        </StyledSelect>
    </StyledFormControl>
    <StyledFormControl>
        <InputLabel id="timer-select-label">タイマー(sec)</InputLabel>
        <StyledSelect labelId="timer-select-label" id="timer-select" value={timer} label="timer" onChange={timerHandleChange}>
        <MenuItem value={0}>0sec</MenuItem>
        <MenuItem value={1}>1sec</MenuItem>
        <MenuItem value={3}>3sec</MenuItem>
        <MenuItem value={5}>5sec</MenuItem>
        <MenuItem value={10}>10sec</MenuItem>
        </StyledSelect>
    </StyledFormControl>
    <div>
      <button onClick={getAccelerator}>加速度取得</button>

      { isMobile && <MotionRec/>}
    </div>
    </Box>
    <LineChart width={400} height={400} data={timeWaveData}>
      <XAxis dataKey="time" name="time" />
      <YAxis />
      <Line type="monotone" dataKey="x" stroke="#8884d8" dot={false} />
      <Line type="monotone" dataKey="y" stroke="#84d8b8" dot={false} />
      <Line type="monotone" dataKey="z" stroke="#c2d884" dot={false} />
    </LineChart>

    <Box sx={{ minWidth: 120 }}>
    <StyledFormControl>
        <InputLabel id="window-select-label"></InputLabel>
        <StyledSelect labelId="window-select-label" id="window-select" value={window} label="window" onChange={windowHandleChange}>
        <MenuItem value={"rectangular"}>矩形</MenuItem>
        <MenuItem value={"hanning"}>ハニング</MenuItem>
        <MenuItem value={"hamming"}>ハミング</MenuItem>
        <MenuItem value={"blackman"}>ブラックマン</MenuItem>
        </StyledSelect>
    </StyledFormControl>
    </Box>
    <LineChart width={400} height={400} data={windowWave}>
      <XAxis dataKey="time" name="time" />
      <YAxis />
      <Line type="monotone" dataKey="window" stroke="#d88484" dot={false} />
      <Line type="monotone" dataKey="x" stroke="#8884d8" dot={false} />
      <Line type="monotone" dataKey="y" stroke="#84d8b8" dot={false} />
      <Line type="monotone" dataKey="z" stroke="#c2d884" dot={false} />
    </LineChart>

    <button onClick={fftExe}>FFT(高速フーリエ変換)</button>
    <LineChart width={400} height={400} data={dataFft}>
        <XAxis dataKey="frq" name="frq" />
        <YAxis />
        <Line type="monotone" dataKey="Xamp" stroke="#8884d8" dot={false} />
        <Line type="monotone" dataKey="Yamp" stroke="#84d8b8" dot={false} />
        <Line type="monotone" dataKey="Zamp" stroke="#c2d884" dot={false} />
    </LineChart>

  </div>
  )
}

export default Fft

const StyledSelect = styled(Select)`
  background-color: white;
`
const StyledFormControl = styled(FormControl)`
  width: 250px;

`
