import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardActionArea, CardContent } from "@mui/material";
import img from "./img/test.png"

const CardBeamCalc = () => {

  return (
    <div>
      <Link to={`beamcalc/`}>
        <OverCard>
          <OverCardActionArea>
            <OverCardMedia component="img" height="140" image={img} alt="card01"/>
              <OverCardContent>
                  梁(はり)の計算ツール <br/>
                  Beam Calculator
              </OverCardContent>
          </OverCardActionArea>
        </OverCard>
      </Link>
    </div>
  )
}
export default CardBeamCalc

const OverCard = styled(Card)`
  background-color:rgba(60,60,60,1);
  margin: 0%;
  width: auto;
  height: auto;
  max-width: 300px;
  min-width: 50px;
  text-align: center;
  &:hover{background: rgba(255, 255, 255, 0.8);}
`
const OverCardMedia = styled(CardMedia)`
  height: 80%;
`
const OverCardActionArea = styled(CardActionArea)`
`
const OverCardContent = styled(CardContent)`
  &:active{}
`
