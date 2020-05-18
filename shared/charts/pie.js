import React, { useEffect, useState } from 'react';
import {Surface, Group, Shape} from '@react-native-community/art';
import * as d3 from 'd3';
import {
  View,
  Text
} from '../index';

export const Pie = ({width, height, data}) => {
  const outterRadius = Math.min(width,height)/2,
        innerRadius = 0;
  const colours = d3.scaleLinear()
          .domain([0, data.length]).range([0, 255]);
  const path = d3.arc()
          .outerRadius(outterRadius)
          .padAngle(.00).innerRadius(innerRadius);
  const pie = d3.pie()(data);
  return <Surface width={width} height={height}>
    <Group x={width/2} y={height/2}>
      {
        pie.map((section) => 
          <Shape
            d={path(section)}
            key={section.data + '-' + section.index}
            fill={`rgb(${50},${colours(section.index)},${colours(section.index)})`}
            strokeWidth={1}
            />
        )
      }
    </Group>
  </Surface>
}