import { StrictMode } from 'react';
import './index.css';
import {AppRouter} from './app/routes';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
