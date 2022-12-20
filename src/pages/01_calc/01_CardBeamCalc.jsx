import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardActionArea, CardContent, Typography  } from "@mui/material";
import test from "./img/test.png"

const CardBeamCalc = () => {
  return (
    <div>
      <Link to={`beamcalc/`}>
        <OverCard>
          <OverCardActionArea>
            <OverCardMedia component="img" height="140" image={test} alt="card01"/>
              <OverCardContent>
                <OverTypography>
                  梁(はり)の計算ツール <br/>
                  Beam Calculator
                </OverTypography>
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
  margin: 10%;
  width: auto;
  height: auto;
  max-width: 300px;
  max-height: 300px;
  &:hover{background: rgba(255, 255, 255, 0.8);}
`
const OverCardMedia = styled(CardMedia)`
  /* margin-bottom: 20%; */
  height: 80%;
`
const OverCardActionArea = styled(CardActionArea)`
`
const OverCardContent = styled(CardContent)`
  &:active{}
`
const OverTypography = styled(Typography)`
  
`