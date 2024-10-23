// src/components/Navbar.tsx
import React from 'react';
import { IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/react';
import { heartOutline, listOutline, home } from 'ionicons/icons';
import './Navbar.css'; // Asegúrate de importar el CSS aquí

const Navbar: React.FC = () => {
  return (
    <IonTabBar slot="bottom" className="navbar">
        <IonTabButton tab="categories" href="/categories">
        <IonIcon icon={listOutline} />
        <IonLabel>Categories</IonLabel>
      </IonTabButton>
      <IonTabButton tab="home" href="/home">
        <IonIcon icon={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="wishlist" href="/wishlist">
        <IonIcon icon={heartOutline} />
        <IonLabel>Wishlist</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default Navbar;
