import { createTheme, responsiveFontSizes } from '@mui/material'

export const DEFAULT_SHADOW = '0 0 10px rgba(3,3,3,0.1)'

const baseTheme = createTheme({
  shape: {
    borderRadius: 25
  },
  palette: {
    primary: {
      main: '#000000'
    }
  }
})

export const theme = responsiveFontSizes(baseTheme)
