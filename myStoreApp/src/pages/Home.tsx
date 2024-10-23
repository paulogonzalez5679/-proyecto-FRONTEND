import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import { useWishlist } from '../store/WishlistContext';
import { Product } from '../types/product';
import './Home.css'; // Asegúrate de importar el archivo CSS

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToWishlist } = useWishlist();

  useEffect(() => {
      const fetchProducts = async () => {
          const data = await getProducts();
          setProducts(data);
      };
      fetchProducts();
  }, []);

  return (
      <div className="home-container"> {/* Añadido estilo a este contenedor */}
          <h1>Productos</h1>
          <ul className="product-list"> {/* Añadido estilo a la lista */}
              {products.map(product => (
                  <li key={product.id} className="product-item"> {/* Añadido estilo a cada ítem */}
                      <img src={product.imageUrl} alt={product.name} />
                      <h2>{product.name}</h2>
                      <p>${product.price}</p>
                      <button onClick={() => addToWishlist(product)}>Agregar a Deseados</button>
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default Home;
