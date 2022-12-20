import React, { useState } from 'react'
import LoadSet01 from './LoadSet01'
import LoadSet02 from './LoadSet02'
import LoadSet03 from './LoadSet03'


const Load = (props) => {
  const [loadValue, setLoadValue] = useState("")
  props.setLoadValue(loadValue)
    return (
    <div>
      { (() => {
      if(props.suportValue === "片端固定") {
        return <LoadSet01 setLoadValue={setLoadValue}/>
      } else if(props.suportValue === "両端固定"){
        return <LoadSet02 />
      } else if(props.suportValue === "両端支持"){
        return <LoadSet03 />
      } else {
        return <p>{props.suportValue}</p>
      }
    })() }


    </div>
  )
}

export default Load