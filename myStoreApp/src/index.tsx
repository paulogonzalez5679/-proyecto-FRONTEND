import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot
import { WishlistProvider } from './store/WishlistContext';
import App from './App';

// Obtiene el elemento root
const rootElement = document.getElementById('root');

// Crea un root y renderiza la aplicación
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <WishlistProvider>
            <App />
        </WishlistProvider>
    );
}
