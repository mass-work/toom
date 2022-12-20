import React, { useState } from 'react';
import pic from "./img/102.png";
import profileSetcss from "./ProfileSet.module.css"

const ProfileSet02 = (props) => {
  const [text1, setText1] = useState();
  const [text2, setText2] = useState();
  const [text3, setText3] = useState();
  const [text4, setText4] = useState();

  const [sectionArea, setSectionArea] = useState("NaN")
  const calc = (in1, in2, in3, in4) => {
    if (in1 <= 0 || in2 <= 0 || in3 <= 0 || in4 <= 0) {
      return setSectionArea("NaN")
    } else {
      return setSectionArea(Number(in1)*Number(in2) - Number(in3)*Number(in4))
    }
  };
  props.setSectionArea(sectionArea)

    return (
      <div className={profileSetcss.profileSet}>
        <img className={profileSetcss.profileImg} src={pic} alt="角パイプ" />
        <div className={profileSetcss.h1} >
          h1:
          <input className={profileSetcss.input} type="number" value={text1} name="h1" onChange={(e) => {setText1(e.target.value); calc(e.target.value, text2, text3, text4)}} />
        </div>
        <div className={profileSetcss.w1} >
          w1:
          <input className={profileSetcss.input} type="number" value={text2} name="w1" onChange={(e) => {setText2(e.target.value); calc(text1, e.target.value, text3, text4)}} />
        </div>
        <div className={profileSetcss.h2} >
          h2:
          <input className={profileSetcss.input} type="number" value={text3} name="h2" onChange={(e) => {setText3(e.target.value); calc(text1, text2, e.target.value, text4)}} />
        </div>
        <div className={profileSetcss.w2} >
          w2:
          <input className={profileSetcss.input} type="number" value={text4} name="w2" onChange={(e) => {setText4(e.target.value); calc(text1, text2, text3, e.target.value)}} />
        </div>
      </div>
  )
}

export default ProfileSet02