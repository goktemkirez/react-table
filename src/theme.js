import { alpha, createTheme, getContrastRatio } from '@mui/material/styles'

const primaryColor = '#E83643'
const primaryColorLight = '#EA4A55'
const primaryColorDark = '#D0303C'

const secondaryColor = '#B8B8BA'
const secondaryColorLight = '#CACACB'
const secondaryColorDark = '#A7A7A9'

export const light = createTheme({
  overrides: {
    '.MuiTreeItem-root': {
      color: '#FFF'
    },
    MuiButton: {
      root: {
        backgroundColor: primaryColorLight,
        '&:hover': {
          backgroundColor: primaryColorLight
        }
      }
    }
  },
  typography: {
    allVariants: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
      textTransform: 'none'
    },
    poster: {
      fontSize: 64,
      color: 'red'
    },
    h1: {
      fontSize: 48
    }
  },
  palette: {
    primary: {
      light: primaryColorLight,
      main: primaryColor,
      dark: primaryColorDark,
      contrastText:
        getContrastRatio(primaryColor, '#fff') > 4.5 ? '#fff' : '#111'
    },
    secondary: {
      light: secondaryColorLight,
      main: secondaryColor,
      dark: secondaryColorDark,
      contrastText:
        getContrastRatio(secondaryColor, '#fff') > 4.5 ? '#fff' : '#111'
    },
    transparentCompanyColor: {
      main: alpha(primaryColor, 0.8),
      light: alpha(primaryColor, 0.2),
      dark: alpha(primaryColor, 0.9),
      contrastText:
        getContrastRatio(alpha(primaryColor, 0.8), '#fff') > 4.5
          ? '#fff'
          : '#111'
    },
    transparentCompanySecondaryColor: {
      main: alpha(secondaryColor, 0.8),
      light: alpha(secondaryColor, 0.2),
      dark: alpha(secondaryColor, 0.9),
      contrastText:
        getContrastRatio(alpha(secondaryColor, 0.8), '#fff') > 4.5
          ? '#fff'
          : '#111'
    },
    specialGrey: {
      main: 'rgba(145, 145, 145, 255)',
      light: 'rgba(145, 145, 145, 255)',
      dark: 'rgba(145, 145, 145, 255)',
      contrastText:
        getContrastRatio(alpha('rgba(145, 145, 145, 255)', 0.8), '#fff') > 4.5
          ? '#fff'
          : '#111'
    }
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          color: primaryColor
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: 'red',
          fontSize: 12,
          lineHeight: 1.3
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: primaryColor,
          color: '#FFFFFF'
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#e0e0e0',
            width: '14px',
            height: '14px'
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#a4a4a4',
            minHeight: 24,
            border: '3px solid #e0e0e0'
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
            {
              backgroundColor: '#959595'
            },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
            {
              backgroundColor: '#959595'
            },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: '#959595'
            },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#e0e0e0'
          }
        }
      }
    },
  }
})

export const dark = createTheme({
  ...light,
  palette: {
    mode: 'dark',
    primary: {
      light: secondaryColorLight,
      main: secondaryColor,
      dark: secondaryColorDark,
      contrastText:
        getContrastRatio(secondaryColor, '#fff') > 4.5 ? '#fff' : '#111'
    },
    secondary: {
      light: primaryColorLight,
      main: primaryColor,
      dark: primaryColorDark,
      contrastText:
        getContrastRatio(primaryColor, '#fff') > 4.5 ? '#fff' : '#111'
    },
    transparentCompanyColor: {
      main: alpha(primaryColor, 0.8),
      light: alpha(primaryColor, 0.2),
      dark: alpha(primaryColor, 0.9),
      contrastText:
        getContrastRatio(alpha(primaryColor, 0.8), '#fff') < 4.5
          ? '#fff'
          : '#111'
    },
    transparentCompanySecondaryColor: {
      main: alpha(secondaryColor, 0.8),
      light: alpha(secondaryColor, 0.2),
      dark: alpha(secondaryColor, 0.9),
      contrastText:
        getContrastRatio(alpha(secondaryColor, 0.8), '#fff') > 4.5
          ? '#fff'
          : '#111'
    },
    specialGrey: {
      main: 'rgba(145, 145, 145, 255)',
      light: 'rgba(145, 145, 145, 255)',
      dark: 'rgba(145, 145, 145, 255)',
      contrastText:
        getContrastRatio(alpha('rgba(145, 145, 145, 255)', 0.8), '#fff') > 4.5
          ? '#fff'
          : '#111'
    }
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: 'red',
          fontSize: 12,
          lineHeight: 1.3
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#2b2b2b',
            width: '14px',
            height: '14px'
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#6b6b6b',
            minHeight: 24,
            border: '3px solid #2b2b2b'
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
            {
              backgroundColor: '#959595'
            },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
            {
              backgroundColor: '#959595'
            },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: '#959595'
            },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#2b2b2b'
          }
        }
      }
    },
  }
})
