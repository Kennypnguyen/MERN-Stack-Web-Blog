import { createMuiTheme } from '@material-ui/core/styles'
import { pink } from '@material-ui/core/colors'

// The custom theme/colors for the WEB Stack Blog
const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
      light: '#e7d27c',
      main: '#e7d27c',
      dark: '#e7d27c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6961',
      main: '#ff6961',
      dark: '#ff6961',
      contrastText: '#000',
    },
      openTitle: '#e7d27c',
      protectedTitle: pink['400'],
      type: 'light'
    }
  })

  export default theme