import React from 'react'

function copyTextToClipboard(text) {
  navigator.clipboard.writeText(text)
  .then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}

const copy = (props) => {
  const clipBoardData =  [
    `計算結果\t記号\t
    最大応力\t(σ)\t${props.calcStress}\tMPa
    たわみ量(合計)\t(δ)\t${props.calcBeamCalc}\tmm
    たわみ量(荷重)\t(δp)\t${props.calcBeamCalcP}\tmm
    たわみ量(自重)\t(δm)\t${props.calcBeamCalcM}\tmm
    断面二次モーメント\t(I)\t${props.calcSecondMoment}\tmm4
    断面係数\t(Z)\t${props.calcSectionCoefficient}\tmm3
    断面積\t(A)\t${props.calcSectionArea}\tmm2
緒言
    材質\t\t${props.selectItem}
    ヤング率\t(E)\t${props.young}\tGPa
    密度\t(ρ)\t${props.density}\tg/cm³
    梁の長さ\t(L)\t${props.length1}\tmm
    荷重\t(p)\t${props.load1}\tN
    質量\t(m)\t${props.mass}\tN
    寸法1\t(${props.dimSymbol1})\t${props.dim1}\tN
    寸法2\t(${props.dimSymbol2})\t${props.dim2}\tN
    寸法3\t()\t\tN
    寸法4\t()\t\tN
    `]
    
  return (
    <div>
        <p>Excel/スプレッドシート転記用</p>
        <button onClick={() => copyTextToClipboard( clipBoardData )}>
        クリップボードにコピー
        </button>
    </div>
  )
}

export default copy
