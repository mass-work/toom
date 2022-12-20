import React, { useState } from 'react';
import SectionalProfilecss from "./SectionalProfile.module.css"

const SectionalProfile = (props) => {
  const [value, setValue] = useState("四角");
  props.setValue(value)
  return (
    <div>
      <h4>断面形状選択</h4>
      <div className={SectionalProfilecss.section}>
        <input className={SectionalProfilecss.sectionInput} id="101" value="四角" type="radio" name="profile" onChange={() => setValue("四角")} defaultChecked />
        <label for="101"></label>
        <input className={SectionalProfilecss.sectionInput} id="102" value="角パイプ" type="radio" name="profile" onChange={() => setValue("角パイプ")} />
        <label for="102"></label>
        <input className={SectionalProfilecss.sectionInput} id="103" value="丸" type="radio" name="profile" onChange={() => setValue("丸")} />
        <label for="103"></label>
        <input className={SectionalProfilecss.sectionInput} id="104" value="丸パイプ" type="radio" name="profile" onChange={() => setValue("丸パイプ")} />
        <label for="104"></label>
        <input className={SectionalProfilecss.sectionInput} id="105" value="H鋼横" type="radio" name="profile" onChange={() => setValue("H鋼横")} />
        <label for="105"></label>
        <input className={SectionalProfilecss.sectionInput} id="106" value="H鋼縦" type="radio" name="profile" onChange={() => setValue("H鋼縦")} />
        <label for="106"></label>
        <input className={SectionalProfilecss.sectionInput} id="107" value="チャンネル横" type="radio" name="profile" onChange={() => setValue("チャンネル横")} />
        <label for="107"></label>
        <input className={SectionalProfilecss.sectionInput} id="108" value="チャンネル縦" type="radio" name="profile" onChange={() => setValue("チャンネル縦")} />
        <label for="108"></label>
        <input className={SectionalProfilecss.sectionInput} id="109" value="リップ横" type="radio" name="profile" onChange={() => setValue("リップ横")} />
        <label for="109"></label>
        <input className={SectionalProfilecss.sectionInput} id="110" value="リップ縦" type="radio" name="profile" onChange={() => setValue("リップ縦")} />
        <label for="110"></label>
        <input className={SectionalProfilecss.sectionInput} id="111" value="アングル" type="radio" name="profile" onChange={() => setValue("アングル")} />
        <label for="111"></label>
      </div>
    </div>
  );
}
export default SectionalProfile;