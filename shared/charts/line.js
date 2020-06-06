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

export const Line = ({width, height, data, style}) => {
  const scaleX = d3.scaleTime()
    .domain([new Date(2007, 3, 24), new Date(2007, 4,  1)])
    .range([0,width]);
  const scaleY = d3.scaleLinear()
    .domain([93, 100])
    .range([0,height]);
  const path = d3.line()
    .x((d) => scaleX(d.date))
    .y((d) => scaleY(d.value))(data);
  return (
    <>
      <Surface 
         width={width} 
         height={height}
         style={style}>
        <Group x={0} y={0}>
          <Shape
            d={path}
            stroke={`rgba(${37},${66},${204},${1}`}
            strokeWidth={2}
            />

        </Group>
      </Surface>
      <G fill='none'>
        {
          data.map(
            (d) => 
              <Text
                key={'thing'}
                fill='#000'
                stroke='#000'
                fontSize='30'
                textAnchor='middle'
                x={4}
                y={2 * 4}>
                >
                53
              </Text>
          )
        }
      </G>
    </>
  )
}