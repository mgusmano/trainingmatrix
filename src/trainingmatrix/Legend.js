import React, { useState } from 'react';
import { Rnd } from "react-rnd";
import { Diamond } from './Diamond';
import { getDates } from './util';
//https://github.com/bokuweb/react-rnd

export const Legend = React.memo((props) => {
  const [legendX, setLegendX] = useState(750);
  const [legendY, setLegendY] = useState(60);
  //const [greendate, yellowdate, reddate] = getDates();
  //var dates = [greendate, yellowdate, reddate];
  const [greendate] = getDates();
  var dates = [greendate];
  var levels = ['0 Not Applicable','1 In Training','2 Developing','3 Certified','4 Trainer','5 Master Trainer'];
  //var levelsval = ['notapplicable','intraining','developing','certified','trainer','mastertrainer'];
  var levelsval = [0,1,2,3,4,5];


  return (
    <Rnd
      size={{ width: '300px',  height: '350px' }}
      style={{zIndex: '10000'}}
      position={{ x: legendX, y: legendY }}
      onDragStop={(e, d) => {
        setLegendX(d.x);
        setLegendY(d.y);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        // this.setState({
        //   width: ref.style.width,
        //   height: ref.style.height,
        //   ...position,
        // });
      }}
    >
      <div className='' style={{...styles.legend,margin:'10px',background:'whitesmoke',width:'100%',height:'100%',zIndex:'10000'}}>
        <div style={{margin:'0 0 0 0'}}>Floating Legend</div>
        <br/>
        <svg height="360px">
          <g key={0} transform="translate(10,20)" className='heading'>
            <text key={1} x="0" y="0"style={{fontSize:'12px'}}>certification:</text>
            <text key={2} x="130" y="0"style={{fontSize:'12px'}}>valid</text>
            <text key={3} x="170" y="0"style={{fontSize:'12px'}}>expiring</text>
            <text key={4} x="225" y="0"style={{fontSize:'12px'}}>expired</text>
          </g>
          {levels.map((level,l) => {
            var y = 40+(50*l)
            var translateLevel = `translate(10,${y})`

            return (
              <g key={l} transform={translateLevel} className='ball'>
              <text dominantBaseline="hanging" stroke="black" style={{fontSize:'16px'}}>{level}</text>
              {dates.map((d,i) => {
                var x = 120+(70*i)
                var translate = `translate(${x+10},-10)`
                var translate2 = `translate(${x+60},-10)`
                var translate3 = `translate(${x+110},-10)`
                return (
                  <>
                  <g key={i+10} transform={translate} className='ball'>
                    <Diamond
                      meta={{id:i,"type":"solid","currcertID":levelsval[l],start:dates[i]}}
                      data={[]}
                      boxSize={30}
                      padding={15}
                    />
                  </g>
                  {l > 2 &&
                  <g key={i+100} transform={translate2} className='ball'>
                    <Diamond
                      meta={{id:i,"type":"solid","currcertID":levelsval[l],letter:'!',start:dates[i]}}
                      data={[]}
                      boxSize={30}
                      padding={15}
                    />
                  </g>
                  }
                  {l > 2 &&
                  <g key={i+1000} transform={translate3} className='ball'>
                    <Diamond
                      meta={{id:i,"type":"solid","currcertID":levelsval[l],letter:'X',start:dates[i]}}
                      data={[]}
                      boxSize={30}
                      padding={15}
                    />
                  </g>
                  }
                  </>
                )
              })}
            </g>
            )
          })}
        </svg>
      </div>
    </Rnd>
  )
})

const styles = {
  legend: {
    boxSizing:'border-box',
    boxShadow:'0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)',
  },
};
