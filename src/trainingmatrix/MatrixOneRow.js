import React from 'react';

export const MatrixOneRow = React.memo((props) => {
  const {name, translateX, translateY, bandX, bandY} = props.params;
  const {data,renderCellFunction,clickCellFunction} = props;
  //console.log(data)

  if (data === null) return (<div></div>)

  var r = 0
  var row = null

  return (
    <g transform={"translate(" + translateX + "," + translateY + ")"} className={name}>
    {
      <g transform={"translate(0," + bandY*r + ")"} className="row">
      {
        data.map((col,c) => {
          return (
            <g key={c} transform="translate(0,0)" className="cell">
              <rect stroke="black" x={bandX*c} y={0} width={bandX} height={bandY} style={{fill:'white',stroke:'black',strokeWidth:'1',fillOpacity:'1.0',strokeOpacity:1.0}}></rect>
              {renderCellFunction !== undefined && renderCellFunction(props.params,c,col,r,row,null,data[c],clickCellFunction)}

            </g>
          )
        })
      }
      </g>
    }
    </g>
  )
})
