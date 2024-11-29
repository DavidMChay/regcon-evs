import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SupabaseProvider } from './context/SupabaseContext.jsx';
import { initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago('TEST-b6b1e459-c38e-4b30-bc43-b45b6ce06f6b'); // Sustituye con tu clave pública

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SupabaseProvider> {/* Envuelve la aplicación con el proveedor */}
      <App />
    </SupabaseProvider>
  </StrictMode>
);
