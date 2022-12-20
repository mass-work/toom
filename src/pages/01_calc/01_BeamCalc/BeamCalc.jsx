import React, { useState } from 'react';
import styled from "styled-components";
import SectionalProfile from "./components/SectionalProfile";
import Suport from "./components/Suport";
import ParaInput from './components/ParaInput';
import Load from './components/Load';
import Output from './components/Output';
import Copy from './components/Copy';

const BeamCalc = () => {
  const [suportValue, setSuportValue] = useState("")
  const [loadValue, setLoadValue] = useState("")
  const [value, setValue] = useState("")

  const [length1, setLength1] = useState("")
  const [load1, setLoad1] = useState("")

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

  const [selectItem, setSelectItem] = useState("");
  const [young, setYoung] = useState("");
  const [density, setDensity] = useState("");

  const [beamCalc, setBeamCalc] = useState("");
  const [beamCalcP, setBeamCalcP] = useState("");
  const [beamCalcM, setBeamCalcM] = useState("");
  const [stressCalc, setStressCalc] = useState("");

  const [mass, setMass] = useState("");

  const [calcStress, setCalcStress] = useState("");
  const [calcBeamCalc, setCalcBeamCalc] = useState("");
  const [calcBeamCalcP, setCalcBeamCalcP] = useState("");
  const [calcBeamCalcM, setCalcBeamCalcM] = useState("");

  return (
    <StyledBeamCalc >
      <header>***************</header>
      <h3>はり(梁)計算app</h3>
      <StyledMainLayout>
        <StyledSubLayout>
          <Suport setSuportValue={setSuportValue}/>
          <Load suportValue={suportValue} setLoadValue={setLoadValue}/>
          <SectionalProfile setValue={setValue}/>
        </StyledSubLayout>
        <StyledSubLayout>
          <ParaInput setSelectItem={setSelectItem}
                      setYoung={setYoung}
                      setDensity={setDensity}
                      setLength1={setLength1}
                      setLoad1={setLoad1}
                      value={value} 
                      loadValue={loadValue} 
                      setDim1={setDim1}
                      setDim2={setDim2}
                      setDimSymbol1={setDimSymbol1}
                      setDimSymbol2={setDimSymbol2}
                      setSectionArea={setSectionArea}
                      setCalcSectionArea={setCalcSectionArea} 
                      setSectionCoefficient={setSectionCoefficient} 
                      setCalcSectionCoefficient={setCalcSectionCoefficient} 
                      setSecondMoment={setSecondMoment}
                      setCalcSecondMoment={setCalcSecondMoment}
                      setBeamCalc={setBeamCalc}
                      setBeamCalcP={setBeamCalcP}
                      setBeamCalcM={setBeamCalcM}
                      setStressCalc={setStressCalc}
                      setMass={setMass}
                      setCalcStress={setCalcStress}
                      setCalcBeamCalc={setCalcBeamCalc}
                      setCalcBeamCalcP={setCalcBeamCalcP}
                      setCalcBeamCalcM={setCalcBeamCalcM}
                      />
        </StyledSubLayout>
        <StyledSubLayout>
          <Output beamCalc={beamCalc}
                  beamCalcP={beamCalcP}
                  beamCalcM={beamCalcM}
                  stressCalc={stressCalc}
                  sectionArea={sectionArea} 
                  sectionCoefficient={sectionCoefficient} 
                  secondMoment={secondMoment}
                  selectItem={selectItem}
                  young={young}
                  density={density}
                  mass={mass}
                  />
        </StyledSubLayout>
        <StyledSubLayout>
          <Copy dim1={dim1}
                dim2={dim2}
                dimSymbol1={dimSymbol1}
                dimSymbol2={dimSymbol2}

                calcStress={calcStress}
                calcBeamCalc={calcBeamCalc}
                calcBeamCalcP={calcBeamCalcP}
                calcBeamCalcM={calcBeamCalcM}
                calcSectionArea={calcSectionArea}
                calcSectionCoefficient={calcSectionCoefficient}
                calcSecondMoment={calcSecondMoment}

                selectItem={selectItem}
                young={young}
                density={density}
                length1={length1}
                load1={load1}
                mass={mass}
                />
        </StyledSubLayout>
      </StyledMainLayout>
    </StyledBeamCalc>
  );
}
export default BeamCalc;

const StyledBeamCalc = styled.div`
  background-color: rgb(20, 20, 25);
  color: rgb(210, 210, 210);
  font-family: "ヒラギノ角ゴ ProN W3"; 
`
const StyledMainLayout = styled.div`
  display: flex;
  margin-left: 10px;
`
const StyledSubLayout = styled.div`
  margin-left: 10px;
`