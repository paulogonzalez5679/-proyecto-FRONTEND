import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonAlert } from '@ionic/react';
import { getWishlist, removeFromWishlist } from '../services/productService'; // Asegúrate de que esta ruta sea correcta
import { WishlistItem } from '../types/WishlistItem'; // Asegúrate de que esta ruta sea correcta

const WishlistPage: React.FC = () => {
  const userId = 1; // Cambia esto por el ID real del usuario
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [alert, setAlert] = useState({ show: false, message: '' });

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist(userId);
        setWishlist(data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setAlert({ show: true, message: 'Error al cargar la lista de deseos.' });
      }
    };

    fetchWishlist();
  }, [userId]);

  const handleRemoveItem = async (productId: number) => {
    try {
      await removeFromWishlist(productId);
      setWishlist((prev) => prev.filter(item => item.productId !== productId)); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error('Error removing item:', error);
      setAlert({ show: true, message: 'Error al eliminar el elemento de la lista de deseos.' });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi Wishlist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {wishlist.map((item) => (
            <IonItem key={item.productId}>
              <IonLabel>
                <h2>{item.product.name}</h2>
                <p>Precio: ${item.product.price}</p>
              </IonLabel>
              <IonButton color="danger" onClick={() => handleRemoveItem(item.productId)}>
                Eliminar
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonAlert
          isOpen={alert.show}
          onDidDismiss={() => setAlert({ ...alert, show: false })}
          header={'Error'}
          message={alert.message}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default WishlistPage;
