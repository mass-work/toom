import React, { useState } from 'react'
import LoadSet01css from "./LoadSet01.module.css"

const LoadSet01 = (props) => {
  const [loadValue, setLoadValue] = useState("片端固定集中");
  props.setLoadValue(loadValue)
  return (
    <div>
      <div className={LoadSet01css.loadSet}>
      <input className={LoadSet01css.loadSetInput} id="11" value="片端固定集中" type="radio" name="LoadSet" onChange={() => setLoadValue("片端固定集中")} defaultChecked />
      <label for="11"></label>
      <input className={LoadSet01css.loadSetInput} id="12" value="片端固定均等" type="radio" name="LoadSet" onChange={() => setLoadValue("片端固定均等")} />
      <label for="12"></label>
      </div>

    </div>
  )
}

export default LoadSet01