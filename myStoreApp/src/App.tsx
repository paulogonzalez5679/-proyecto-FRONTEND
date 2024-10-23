// src/App.tsx
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ProductListByCategory from './pages/ProductListByCategory';
import WishlistPage from './pages/WishlistPage';
import Navbar from './components/Navbar';

/* Importación de CSS necesarios para Ionic */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/products/:categoryId" component={ProductListByCategory} />
        <Route exact path="/wishlist" component={WishlistPage} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
      <Navbar /> {/* Asegúrate de que el Navbar está aquí */}
    </IonReactRouter>
  </IonApp>
);

export default App;