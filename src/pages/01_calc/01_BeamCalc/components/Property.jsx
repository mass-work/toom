import React, { useState }  from 'react';
import propertycss from "./Property.module.css"

const Property = (props) => {
    const items = ["任意入力", "SS400", "S45C", "ねずみ鋳鉄"]
    const [selectItem, setSelectItem] = useState();
    const [young, setYoung] = useState();
    const [density, setDensity] = useState();

    const handleChange = (e) => {
        setSelectItem(e.target.value);
        if (e.target.value === "SS400") {
            return [setYoung(205), setDensity(7.86)]
        } else if (e.target.value === "S45C") {
            return [setYoung(205), setDensity(7.86)]
        } else if (e.target.value === "ねずみ鋳鉄") {
            return [setYoung(100), setDensity(7.1)]
        } else {
            return [setYoung(), setDensity()]
        }
      };
        props.setSelectItem(selectItem)
        props.setYoung(young)
        props.setDensity(density)

        return (
            <div className={propertycss.property}>
                物性値入力
                <div>
                    材質:
                    <select className={propertycss.selectBox} value={selectItem} onChange={handleChange}> 
                        {items.map((item) => ( 
                        <option key={item} value={item}>
                            {item}
                        </option>
                        ))}
                    </select>
                </div>
                <div>
                    ヤング率:
                    <input className={propertycss.inputBox} type="number" value={young} name="young"></input>
                    <span className={propertycss.unit}>Gpa</span>
                </div>
                <div>
                    比重:
                    <input className={propertycss.inputBox} type="number" value={density} name="density"></input>
                    <span className={propertycss.unit}>g/cm³</span>
                </div>
            </div>
        )
    }

export default Property