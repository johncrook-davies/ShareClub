import React, { useEffect, useState } from 'react';
import {Surface, Group, Shape} from '@react-native-community/art';
import * as d3 from 'd3';
import Svg, {
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

const YAxis = ({yAxis, padding}) => <>
  {
    yAxis.map(
      (d) => 
        <Text
          key={ d.pos }
          fill='#000'
          stroke='#000'
          fontSize='12'
          fontFamily='Asap-bold'
          textAnchor='end'
          x={ padding / 2 }
          y={ d.pos }>
          { d.value }
        </Text>
    )
  }
</>
      
const XAxis = ({xAxis, outterHeight, padding}) => <>
  {
    xAxis.map(
      (d) => 
        <Text
          key={ d.pos }
          fill='#000'
          stroke='#000'
          fontSize='12'
          fontFamily='Asap-bold'
          textAnchor='middle'
          transform="translate(0,0)"
          x={ d.pos }
          y={ outterHeight }>
          { d.value.toISOString().split('T')[0] }
        </Text>
    )
  }
</>

export const Line = ({width, height, data, style}) => {
  const padding = 50,
        innerHeight = height - padding,
        innerWidth = width - padding;
  const scaleX = d3.scaleTime()
    .domain([new Date(2007, 3, 24), new Date(2007, 4,  1)])
    .range([0,innerWidth]);
  const scaleY = d3.scaleLinear()
    .domain([100, 93])
    .range([0,innerHeight]);
  const xAxis = scaleX.ticks(2).reduce((acc, x, i) => {
    return acc.concat({
      pos: i/3 * innerWidth + padding/2,
      value: x
    })
  },[]);
  const yAxis = scaleY.ticks(10).reduce((acc, x, i) => {
    return acc.concat({
      pos: i/11 * innerHeight + padding/2,
      value: x
    })
  },[])
  const path = d3.line()
    .x((d) => scaleX(d.date))
    .y((d) => scaleY(d.value))(data);
  return (
    <>
      <Svg 
        width={width} 
        height={height}
        >
        <Surface 
          width={width} 
          height={height}
          style={style}
          >
          <Group x={padding/2} y={padding/2}>
            <Shape
              d={path}
              stroke={`rgba(${37},${66},${204},${1}`}
              strokeWidth={2}
              />
          </Group>
        </Surface>
        <G>
          <YAxis 
            yAxis={ yAxis } 
            padding={ padding }
            />
          <XAxis 
            xAxis={ xAxis } 
            outterHeight={ height }
            padding={ padding }
            />
        </G>
      </Svg>
      
    </>
  )
}