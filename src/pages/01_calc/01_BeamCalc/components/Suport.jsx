import React, { useState } from 'react';
import Suportcss from "./Suport.module.css"

const Suport = (props) => {
  const [suportValue, setSuportValue] = useState("片端固定");
  props.setSuportValue(suportValue)
  return (
    <div>
      <h4>支持/荷重条件選択</h4>
      <div className={Suportcss.suport}>
        <input className={Suportcss.suportInput} id="01" value="片端固定" type="radio" name="suport" onChange={() => setSuportValue("片端固定")} defaultChecked />
        <label for="01"></label>
        <input className={Suportcss.suportInput} id="02" value="両端固定" type="radio" name="suport" onChange={() => setSuportValue("両端固定")} />
        <label for="02"></label>
        <input className={Suportcss.suportInput} id="03" value="両端支持" type="radio" name="suport" onChange={() => setSuportValue("両端支持")} />
        <label for="03"></label>
      </div>
    </div>
  )
}

export default Suport