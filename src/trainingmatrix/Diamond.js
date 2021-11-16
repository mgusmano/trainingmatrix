import React, { useState, useEffect} from 'react';
import {SvgX, PathX, TextX, CircleX} from './SvgStuff';
import { getTheColor, getTheColor2 } from './state/Util';

export const Diamond = ({meta, data, boxSize, padding}) => {
  const [solidcolor, setSolidColor] = useState(null)
  var type = meta.type
  var strokecolor =  'black'; //meta.strokecolor;
  if (meta.currcertID === 0) {
    strokecolor = "linen"
  }
  var letter = meta.letter
  if (typeof data === 'string') {
    data = JSON.parse(data)
  }
  if (typeof meta === 'string') {
    meta = JSON.parse(meta)
  }
  if (meta.trainer === "true") { meta.trainer = true }
  if (meta.trainer === "false") { meta.trainer = false }
  var status = meta.status;

  useEffect(() => {
    if (meta.currcertID !== undefined) {
      //var c = getTheColor(meta.certification)
      var c = getTheColor2(meta.currcertID)
      setSolidColor(c)
    }
  },[meta])

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
  function describeArc(x, y, radius, startAngle, endAngle){
      var start = polarToCartesian(x, y, radius, endAngle);
      var end = polarToCartesian(x, y, radius, startAngle);
      var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      var d = [
          "M", start.x, start.y,
          "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
      ].join(" ");
      return d;
  }
  const getColor = ((start,status)=>{
    if (status === 'not started') return 'lightgray';
    let d = new Date(start);
    var today = new Date();
    var timeinmilisec = d.getTime() - today.getTime();
    var diff = -(Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24)))
    switch(true) {
      case (diff > 180):
        return 'red'
      case (diff > 160):
        return 'goldenrod'
      default:
        return 'green'
    }
  })
  const getSlice = (slice,size) => {
    var opacity = 0;
    if (slice.s === 1) { opacity = 0.6}
    var a,path;
    switch(slice.p) {
      case (25):
        return [`${describeArc(0, 0, size, 0, 90)} L0,0 z`,opacity]
        //var path = `M0,0 L ${size}, 0 ${a} L-0,-${size} z`
      case (50):
        a = describeArc(0, 0, size, 90, 180)
        path = `${a} L0,0 z`
        return [path,opacity]
        //return [`M0,0 L 0, ${size}  L ${size}, 0 z`,opacity]
      case (75):
        a = describeArc(0, 0, size, 180, 270)
        path = ` ${a} L0,0 z`
        return [path,opacity]
        //return [`M0,0 L 0, ${size}  L-${size}, 0 z`,opacity]
      case (100):
        a = describeArc(0, 0, size, 270, 360)
        path = `${a}  L0,0 z`
        return [path,opacity]
        //return [`M0,0 L 0, -${size} L-${size}, 0 z`,opacity]
      default:
        return ''
    }
  }
  const color = getColor(meta.start, status)
  const pieStrokeWidth = 100/boxSize;
  var diamondSize = 100-padding;
  var radius = diamondSize;

//center (x,y), radius r, degree_start, degree_end, direction
  //var a = describeArc(0, 0, 100, 0, 180)
  //console.log(a)

  return (
    <SvgX width={boxSize} height={boxSize} viewBox={'-100 -100 200 200'}>

    {type === 'solid' &&
    <>
    <CircleX cx={0} cy={0} fill={solidcolor} r={radius} stroke={strokecolor} strokeWidth={(40-padding)} fillOpacity="1.0" />
    <TextX textAnchor="middle" alignmentBaseline="middle" fontSize={(130-padding)} fill="white" x ={'0'} y ={(diamondSize/7)} width={(44-padding)} height={(40-padding)} strokeWidth="1" stroke="black">{letter}</TextX>
    </>
    }

    {type !== 'solid' && status === 'started' &&
    data.map((slice,s)=>{
      var [d,f] = getSlice(slice,diamondSize)
      return (
        <PathX key={s} d={d} style={{fill:color,stroke:color,fillOpacity:f,strokeWidth:pieStrokeWidth}}/>
      )
    })}
    {status === 'started' && meta.trainer === true &&
    <>
    <TextX textAnchor="middle" alignmentBaseline="middle" fontSize={(130-padding)} fill="black" x ={'0'} y ={(diamondSize/4)} width={(44-padding)} height={(40-padding)} strokeWidth="1" stroke="black">T</TextX>
    <CircleX cx={0} cy={0} r={radius} stroke="blue" strokeWidth={(40-padding)} fillOpacity="0.0" />
    </>
    }

    </SvgX>
  )
}

//    <SvgX width={boxSize} height={boxSize} viewBox={(-100+pad) + ' ' + (-100+pad) + ' ' + (200-pad) + ' ' + (200-pad)}>

//    <TextX fontSize={(130-padding)} fill="black" x ={(-44+padding)} y ={(50-padding)} width={(44-padding)} height={(40-padding)} strokeWidth="1" stroke="black">T</TextX>

