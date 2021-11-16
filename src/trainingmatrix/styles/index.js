//https://thoughtbot.com/blog/structure-for-styling-in-react-native
//import * as Buttons from './buttons'
import * as Colors from './colors'
//import * as Spacing from './spacing'
//import * as Typography from './typography'

//export { Typography, Spacing, Colors, Buttons }
export { Colors }

export const styles = {
  horizontal: {
    display:'flex',
    flex:1,
    flexDirection:'row',
    boxSizing:'border-box',
    border:'0px solid blue',
    overflow:'hidden'
  },
  vertical: {
    display:'flex',
    flex:1,
    flexDirection:'column',
    boxSizing:'border-box',
    border:'0px solid blue',
    overflow:'hidden'
  },

  h: {
    display:'flex',
    flexDirection:'row',
    boxSizing:'border-box',
    border:'0px solid blue',
    xoverflow:'hidden'
  },
  v: {
    display:'flex',
    flexDirection:'column',
    boxSizing:'border-box',
    border:'0px solid blue',
    xoverflow:'hidden'
  },
};