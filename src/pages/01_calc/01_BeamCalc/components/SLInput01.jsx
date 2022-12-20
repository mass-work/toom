import React, { useState }  from 'react'
import pic from "./img/11.png";
import sLInputcss from "./SLInput.module.css"

const SLInput01 = (props) => {
    const [length1, setLength1] = useState();
    const [load1, setLoad1] = useState();

    props.setLength1(length1)
    props.setLoad1(load1)
        return (
        <div className={sLInputcss.sLInput01}>
            <img className={sLInputcss.sLimg} src={pic} alt="片端固定集中" />
            <div className={sLInputcss.l} >
                L:
                <input className={sLInputcss.input} type="number" value={length1} name="L" onChange={(e) => {setLength1(e.target.value)}} />
            </div>
            <div className={sLInputcss.p} >
                p:
                <input className={sLInputcss.input} type="number" value={load1} name="W" onChange={(e) => {setLoad1(e.target.value)}} />
            </div>
        </div>

  )
}

export default SLInput01