import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardActionArea, CardContent } from "@mui/material";
import img from "./img/Nut.png"

const CardNut = () => {

  return (
    <div>
      <Link to={`elements/nut/`}>
        <OverCard>
          <OverCardActionArea>
            <OverCardMedia component="img" height="140" image={img} alt="card01"/>
              <OverCardContent>
                  溶接ナット <br/>
                  Weld Nut
              </OverCardContent>
          </OverCardActionArea>
        </OverCard>
      </Link>
    </div>
  )
}
export default CardNut

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
