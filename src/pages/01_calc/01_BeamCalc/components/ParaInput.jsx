import React, { useState }  from 'react';
import SLInput01 from './SLInput01'
import SLInput02 from './SLInput02'
import ProfileSet01 from './ProfileSet01'
import ProfileSet02 from './ProfileSet02'
import Property from './Property';

const ParaInput = (props) => {
  // 物性値
  const [selectItem, setSelectItem] = useState("");
  const [young, setYoung] = useState("");
  const [density, setDensity] = useState("");

  // 支持、荷重
  const [length1, setLength1] = useState("");
  const [load1, setLoad1] = useState("");

  // 断面
  const [dim1, setDim1] = useState("");
  const [dim2, setDim2] = useState("");
  const [dimSymbol1, setDimSymbol1] = useState("");
  const [dimSymbol2, setDimSymbol2] = useState("");

  const [sectionArea, setSectionArea] = useState("")
  const [calcSectionArea, setCalcSectionArea] = useState("")
  const [sectionCoefficient, setSectionCoefficient] = useState("")
  const [calcSectionCoefficient, setCalcSectionCoefficient] = useState("")
  const [secondMoment, setSecondMoment] = useState("")
  const [calcSecondMoment, setCalcSecondMoment] = useState("")

  // 梁の計算
  const beamCalcP = (load1 * length1**3)/(3*young*1000*secondMoment)
  const beamCalcM = (sectionArea / 1000**2 * density * 10 * length1**4)/(8*young*1000*secondMoment)
  const beamCalc = Number(beamCalcP) + Number(beamCalcM)
  const stressCalc = load1 * length1 / sectionCoefficient

  // その他
  const mass = sectionArea * length1 / (10**3) * density / 1000 *9.80665

  // 数式
  const calcStress = "=INDIRECT(ADDRESS(ROW()+12,COLUMN()))*INDIRECT(ADDRESS(ROW()+11,COLUMN()))/INDIRECT(ADDRESS(ROW()+5,COLUMN()))"
  const calcBeamCalc = "=INDIRECT(ADDRESS(ROW()+1,COLUMN()))+INDIRECT(ADDRESS(ROW()+2,COLUMN()))"
  const calcBeamCalcP = "=INDIRECT(ADDRESS(ROW()+10,COLUMN()))*INDIRECT(ADDRESS(ROW()+9,COLUMN()))^3/(3*INDIRECT(ADDRESS(ROW()+7,COLUMN()))*1000*INDIRECT(ADDRESS(ROW()+2,COLUMN())))"
  const calcBeamCalcM = "=INDIRECT(ADDRESS(ROW()+3,COLUMN()))/1000^2*INDIRECT(ADDRESS(ROW()+7,COLUMN()))*10*INDIRECT(ADDRESS(ROW()+8,COLUMN()))^4/(8*INDIRECT(ADDRESS(ROW()+6,COLUMN()))*1000*INDIRECT(ADDRESS(ROW()+1,COLUMN())))"

  props.setSelectItem(selectItem)
  props.setYoung(young)
  props.setDensity(density)

  props.setLength1(length1)
  props.setLoad1(load1)

  props.setDim1(dim1)
  props.setDim2(dim2)
  props.setDimSymbol1(dimSymbol1)
  props.setDimSymbol2(dimSymbol2)
  props.setSectionArea(sectionArea)
  props.setCalcSectionArea(calcSectionArea)
  props.setSectionCoefficient(sectionCoefficient)
  props.setCalcSectionCoefficient(calcSectionCoefficient)
  props.setSecondMoment(secondMoment)
  props.setCalcSecondMoment(calcSecondMoment)

  props.setBeamCalc(beamCalc)
  props.setBeamCalcP(beamCalcP)
  props.setBeamCalcM(beamCalcM)
  props.setStressCalc(stressCalc)

  props.setMass(mass)
  
  props.setCalcStress(calcStress)
  props.setCalcBeamCalc(calcBeamCalc)
  props.setCalcBeamCalcP(calcBeamCalcP)
  props.setCalcBeamCalcM(calcBeamCalcM)
  return (
  <div>
    <h4>パラメータ入力</h4>
    {/* 物性値入力 */}
    <Property setSelectItem={setSelectItem}
              setYoung={setYoung}
              setDensity={setDensity}/>



    {/* 梁と荷重のパラメータ設定 */}
    { (() => {
      if(props.loadValue === "片端固定集中") {
        return <SLInput01 setLength1={setLength1}
                          setLoad1={setLoad1}/>
      } else if(props.loadValue === "片端固定均等"){
        return <SLInput02 />
      } else {
        return <p>{props.value}</p>
      }
    })() }

    {/* 断面形状の寸法設定 */}
    { (() => {
      if(props.value === "四角") {
        return <ProfileSet01 setDim1={setDim1}
                             setDim2={setDim2}
                             setDimSymbol1={setDimSymbol1}
                             setDimSymbol2={setDimSymbol2}
                             setSectionArea={setSectionArea}
                             setCalcSectionArea={setCalcSectionArea}
                             setSectionCoefficient={setSectionCoefficient} 
                             setCalcSectionCoefficient={setCalcSectionCoefficient} 
                             setSecondMoment={setSecondMoment}
                             setCalcSecondMoment={setCalcSecondMoment}/>
      } else if(props.value === "角パイプ"){
        return <ProfileSet02 setSectionArea={setSectionArea}/>
      } else {
        return <p>{props.value}</p>
      }
    })() }

  </div>
  )
}

export default ParaInput