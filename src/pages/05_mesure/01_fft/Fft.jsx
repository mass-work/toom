import React from 'react'
import { LineChart, Line, XAxis } from 'recharts';

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
const sinFrq = 10
let a = []
for (var j = 0; j < N; j++) {
    a.push(Math.sin(Math.PI * 2 / N * j * sinFrq));
}

const fr0 = a;
const f0 = fr0.map(r => [r, 0]);
const F = fft0(f0);
// const f1 = ifft0(F);
// const fr1 = f1.map(([r]) => r);
const amp = F.map(amp => Math.abs(amp[1]))

const data = []
const dataFft = []
for (var i = 0; i < N; i++) {
    var dataTmp = {};
    var dataFftTmp = {};

    // [{x:*, y:*, z:*}]の連想配列を作る
    dataTmp.x = i / 1000;
    dataTmp.y = Math.sin(Math.PI * 2 / N * i * sinFrq);
    dataTmp.z = i ** i;

    dataFftTmp.frq = 1 / 0.001 / N * i
    dataFftTmp.amp = amp[i]
    // 連想配列を配列に追加していく
    data.push(dataTmp);
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
  return (
    <div>
        <LineChart width={400} height={400} data={data}>
            <XAxis dataKey="x" name="time" />
            <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
        </LineChart>

        <LineChart width={400} height={400} data={dataFft}>
            <XAxis dataKey="frq" name="frq" />
            <Line type="monotone" dataKey="amp" stroke="#8884d8" dot={false} />
        </LineChart>
  </div>
  )
}

export default Fft