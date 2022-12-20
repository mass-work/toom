import React, { useState } from 'react';
import pic from "./img/101.png"
import profileSetcss from "./ProfileSet.module.css"

const ProfileSet01 = (props) => {
  const [dim1, setDim1] = useState();
  const [dim2, setDim2] = useState();
  const dimSymbol1 = "h1"
  const dimSymbol2 = "b1"

  const [sectionArea, setSectionArea] = useState("NaN")
  const calcSectionArea = "=INDIRECT(ADDRESS(ROW()+8,COLUMN()))*INDIRECT(ADDRESS(ROW()+9,COLUMN()))"
  const [sectionCoefficient, setSectionCoefficient] = useState("NaN")
  const calcSectionCoefficient = "=INDIRECT(ADDRESS(ROW()+9,COLUMN()))^2*INDIRECT(ADDRESS(ROW()+10,COLUMN()))/6"
  const [secondMoment, setSecondMoment] = useState("NaN")
  const calcSecondMoment = "=INDIRECT(ADDRESS(ROW()+10,COLUMN()))^3*INDIRECT(ADDRESS(ROW()+11,COLUMN()))/12"
  

  const calc = (in1, in2) => {
    if (in1 <= 0 || in2 <= 0) {
      return [setSectionArea("NaN"), 
              setSectionCoefficient("NaN"), 
              setSecondMoment("NaN")]
    } else {
      return [setSectionArea(Number(in1) * Number(in2)), 
              setSectionCoefficient(Number(in2) * Number(in1) ** 2 / 6), 
              setSecondMoment(Number(in2) * Number(in1) ** 3 / 12)]
    }
  };
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

    return (
      <div className={profileSetcss.profileSet}>
          <img className={profileSetcss.profileImg} src={pic} alt="四角" />
          <div className={profileSetcss.h1} >
            h1:
            <input className={profileSetcss.input} type="number" value={dim1} name="h1" onChange={(e) => {setDim1(e.target.value); calc(e.target.value, dim2)}} />
          </div>
          <div className={profileSetcss.b1} >
            b1:
            <input className={profileSetcss.input} type="number" value={dim2} name="w1" onChange={(e) => {setDim2(e.target.value); calc(dim1, e.target.value)}} />
          </div>
      </div>
  )
}

export default ProfileSet01