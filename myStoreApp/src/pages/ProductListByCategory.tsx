import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonAlert } from '@ionic/react';
import { getProductsByCategory } from '../services/productService';
import { useWishlist } from '../store/WishlistContext'; // Importa correctamente el contexto
import { Product } from '../types/product'; 
import { WishlistItem } from '../types/WishlistItem'; 

const ProductListByCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [alert, setAlert] = useState({ show: false, message: '' });
  const { addToWishlist } = useWishlist(); // Usa el hook para obtener addToWishlist

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategory(parseInt(categoryId));
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setAlert({ show: true, message: 'Error al cargar productos.' });
      }
    };

    fetchProducts();
  }, [categoryId]);

  const handleAddToWishlist = (product: Product) => {
    addToWishlist(product); // Solo pasa el objeto product
    setAlert({ show: true, message: 'Producto agregado a la lista de deseos' });
};
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Productos en la Categoría</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {products.map((product) => (
            <IonItem key={product.id}>
              <IonLabel>{product.name}</IonLabel>
              <IonButton onClick={() => handleAddToWishlist(product)}>Agregar a Wishlist</IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonAlert
          isOpen={alert.show}
          onDidDismiss={() => setAlert({ ...alert, show: false })}
          header={'Éxito'}
          message={alert.message}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProductListByCategory;
