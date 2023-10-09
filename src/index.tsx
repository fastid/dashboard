import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {ChakraProvider, createLocalStorageManager} from '@chakra-ui/react'
import theme from './theme'
import {RecoilRoot} from 'recoil'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const manager = createLocalStorageManager('theme')

root.render(
  <ChakraProvider theme={theme} colorModeManager={manager}>
    <RecoilRoot>
      <App/>
    </RecoilRoot>
  </ChakraProvider>
);

