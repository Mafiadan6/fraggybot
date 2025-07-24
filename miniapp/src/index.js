import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TonConnectUIProvider } from 'ton-connect-ui-react';

const manifestUrl = 'https://your-domain.com/tonconnect-manifest.json'; // TODO: Set your manifest URL

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>
); 