export const SvgX = (props) => {
  //console.log(props)
  return (
  <svg {...props}>{props.children}</svg>
  )
}

export const GX = (props) => {
  //console.log(props)
  return (
  <g {...props}>{props.children}</g>
  )
}

export const PathX = (props) =>{
  return (
  <path {...props}>{props.children}</path>
  )
}

export const TextX = (props) => {
  return (
  <text {...props}>{props.children}</text>
  )
}

export const CircleX = (props) => {
  return (
  <circle {...props}>{props.children}</circle>
  )
}

export const ImageX = (props) => {
  return (
  <img alt="" {...props}>{props.children}</img>
  )
}




