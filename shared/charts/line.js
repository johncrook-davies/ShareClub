import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native-appearance';
import {Surface, Group, Shape} from '@react-native-community/art';
import * as d3 from 'd3';
import Svg, {
  G,
  Text,
  Line,
} from 'react-native-svg';
import { colours as c } from '../../shared';

const formatNumber = (num) => {
  let strNum = `${num}`;
  if(strNum.indexOf('.') === -1) {
    return strNum += '.0'
  } else {
    return strNum
  }
}

const formatDate = (date) => {
  let arr = date.toISOString().split('T')[0].split('-');
  return `${arr[2]}/${arr[1]}/${arr[0].slice(2)}`
}

const YAxis = ({ 
  yAxis, 
  outterWidth, 
  fontSize, 
  fontFamily,
  color,
}) => <>
  {
    yAxis.map(
      (d) => 
        <>
          <Line 
            x1={ 0 } 
            y1={ d.pos } 
            x2={ 6 } 
            y2={ d.pos } 
            stroke={ color }
            strokeWidth={ 2 }
            />
          <Text
            key={ d.pos }
            fill={ color }
            stroke={ color }
            strokeWidth={ 0.5 }
            fontSize={`${fontSize}`}
            fontFamily={ fontFamily }
            textAnchor='end'
            transform={`translate(${-fontSize},${fontSize/3})`}
            x={ 0 }
            y={ d.pos }>
            { formatNumber(d.value) }
          </Text>
        </>
    )
  }
</>
      
const XAxis = ({ 
      xAxis, 
      height, 
      fontSize, 
      fontFamily,
      color,
}) => <>
  {
    xAxis.map(
      (d) => 
        <>
          <Line 
            x1={ d.pos } 
            y1={ height } 
            x2={ d.pos }
            y2={ height - 6 } 
            stroke={ color }
            strokeWidth={ 2 }
            />
          <Text
            key={ d.pos }
            fill={ color }
            stroke={ color }
            strokeWidth={ 0.5 }
            fontSize={`${fontSize}`}
            fontFamily={ fontFamily }
            textAnchor='middle'
            transform={`translate(0,${2*fontSize})`}
            x={ d.pos }
            y={ height }
            >
            { formatDate(d.value) }
          </Text>
      </>
    )
  }
</>

export const LineGraph = ({width, height, data, style}) => {
  const isDark = useColorScheme() === 'dark',
        fontSize = 10,
        fontFamily = 'Asap-Regular',
        fontColor = isDark? c.dark.graphTextColor : c.light.graphTextColor,
        lineColor = isDark? c.dark.graphLineColor : c.light.graphLineColor,
        padding = 90+fontSize,
        innerHeight = height - padding,
        innerWidth = width - padding;
  const yExtents = d3.extent(d3.merge(data), (d) => d.value),
        xExtents = d3.extent(d3.merge(data), (d) => d.date);
  const scaleX = d3.scaleTime()
    .domain([xExtents[0], xExtents[1]])
    .range([0,innerWidth]);
  const xAxis = scaleX.ticks(7).reduce((acc, x, i) =>(
    acc.concat({
      pos: i/(scaleX.ticks(7).length-1) * innerWidth,
      value: x
    })
  ),[]);
  const yAxisArr = d3.scaleLinear()
    .domain([yExtents[1]+1, yExtents[0]-1])
    .ticks(10);
  const yAxis = yAxisArr.reduce((acc, x, i) => (
      acc.concat({
        pos: i/(yAxisArr.length-1) * innerHeight,
        value: x
      })
    ),[])
  const scaleY = d3.scaleLinear()
    .domain([yAxisArr[0], yAxisArr[10]])
    .range([0,innerHeight]);
  const path = d3.line()
    .curve(d3.curveStepAfter)
    .x((d) => scaleX(d.date))
    .y((d) => scaleY(d.value))(data[0]);
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
              stroke={lineColor}
              strokeWidth={1.5}
              />
          </Group>
        </Surface>
        <G
          transform={`translate(${padding/2},${padding/2})`}
          >
          <YAxis 
            yAxis={ yAxis } 
            outterWidth={ width }
            fontSize={ fontSize }
            fontFamily={ fontFamily }
            color={ fontColor }
            />
          <XAxis 
            xAxis={ xAxis } 
            height={ innerHeight }
            fontSize={ fontSize }
            fontFamily={ fontFamily }
            color={ fontColor }
            />
        </G>
      </Svg>
    </>
  )
}