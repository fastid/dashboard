import {extendTheme, ThemeConfig} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
  cssVarPrefix: 'fastid',
}


// 3. extend the theme
export const theme = extendTheme({
  config: config,

  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  colors: {
    brand: {
      50: "#ebf8ff",
      100: "#bee3f8",
      200: "#90cdf4",
      300: "#63b3ed",
      400: "#4299e1",
      500: "#3182ce",
      600: "#2b6cb0",
      700: "#2c5282",
      800: "#2a4365",
      900: "#1A365D",
    }
  },
  styles: {
    global: {
      html: {
        fontSize: "14px"
      }
    }
    // global: (props: StyleFunctionProps) => ({
    //   body: {
    //     color: 'default',
    //     bg: '#000000',
    //   }
    // }),
  },
  components: {
    Link: {
      baseStyle: {
        // normal styling
        textDecoration: "none",
        // hover styling goes here
        _hover: {
          textDecoration: "none",
        },
      },
    }
  }
})

export default theme
