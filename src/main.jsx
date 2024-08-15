import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import theme from './theme.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import IPChecker from '../IPChecker.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IPChecker>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </IPChecker>
  </StrictMode>
);
