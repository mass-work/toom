import React from 'react'

const Output = (props) => {
  const orgRound = (value, base) => {
    return Math.round(value * base) / base
  }
  return (
    <div>
      <h4>計算結果</h4>
      <p>最大応力(σmax):{ orgRound(props.stressCalc, 100) }</p>
      <p>たわみ量合計(δ):{ orgRound(props.beamCalc, 100) }</p>
      <p>たわみ量荷重(δp):{ orgRound(props.beamCalcP, 100) }</p>
      <p>たわみ量自重(δm):{ orgRound(props.beamCalcM, 100) }</p>
      <p>断面二次モーメント(I): { orgRound(props.secondMoment, 10) } mm<sup>4</sup></p>
      <p>断面係数(Z): { orgRound(props.sectionCoefficient, 10) } mm<sup>3</sup></p>
      <p>断面積(A): { props.sectionArea } mm<sup>2</sup></p>
      <p>質量(w):{props.mass}N</p>
    </div>
  )
}

export default Output




