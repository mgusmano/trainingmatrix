import React, { useEffect, useState } from 'react';

export const Matrix = React.memo((props) => {
  const {name, translateX, translateY, bandX, bandY, oneRow, stroke, top, fontsize} = props.params;
  const {data,renderRowFunction,renderCellFunction,clickCellFunction} = props;
  const [sColor, setColor] = useState('black');
  const [sTop, setTop] = useState(0);


  useEffect(() => {
    if (top !== undefined) {
      setTop(top)
    }
    if (stroke !== undefined) {
      setColor(stroke);
    }
  }, [stroke,top]);

  const getRow = (row,oneRow) => {
    if (row.data === undefined) {
      if (Array.isArray(row)) {
        return row;
      }
      else {
        return [row]
      }
    }
    else {
      return row.data
    }
  }

  const getJ = () => {
    //console.log(data)
    var r = data.map((row,r) => {
      var theRow = getRow(row,oneRow)
      //console.log(theRow)
      return (
        <g key={r} transform={"translate(0," + ((bandY*r)+(sTop*r)) + ")"} className="row">
          {renderRowFunction !== undefined && renderRowFunction(props.params,r,row,sTop,fontsize)}
          {
            theRow.map((col,c) => {
              return (
                <g key={c} transform="translate(0,0)" className="cell">
                  <rect stroke={sColor} x={(bandX*c)} y={sTop} width={bandX} height={bandY} style={{fill:'white',strokeWidth:'1',fillOpacity:'1.0',strokeOpacity:1.0}}></rect>
                  {renderCellFunction !== undefined && renderCellFunction(props.params,c,col,r,row,sTop,col,clickCellFunction,fontsize)}
                </g>
              )
            })
          }
        </g>
      )
    })
    return r;
  }

  return (
    <g transform={"translate(" + translateX + "," + translateY + ")"} className={name}>
      {getJ()}
    </g>
  )
})
