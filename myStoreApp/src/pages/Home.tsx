// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { getProducts, getCategoryById, addToWishlist } from '../services/productService';
import { useWishlist } from '../store/WishlistContext';
import { Product } from '../types/product';
import './Home.css';

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const { addToWishlist: addToWishlistContext } = useWishlist();

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
            setFilteredProducts(data); // Inicialmente, muestra todos los productos
        };
        fetchProducts();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);

        // Filtrar los productos según el término de búsqueda
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleAddToWishlist = async (product: Product) => {
        try {
            // Obtener la categoría por ID
            const category = await getCategoryById(product.categoryId);

            // Construir el objeto wishlistItem
            const wishlistItem = {
                userId: 1, // Reemplaza esto con el ID real del usuario
                productId: product.id,
                product: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    categoryId: product.categoryId,
                    imageUrl: product.imageUrl,
                    category: {
                        id: category.id, // ID de la categoría obtenida
                        name: category.name, // Nombre de la categoría obtenida
                        products: [] // Puedes dejarlo vacío o llenar según sea necesario
                    }
                }
            };

            // Enviar el wishlistItem al servicio
            await addToWishlist(wishlistItem);
            addToWishlistContext(product); // También puedes agregar a tu contexto si es necesario
            alert('Producto agregado a la lista de deseos'); // Mensaje de éxito
        } catch (error) {
            console.error('Error al agregar a la lista de deseos:', error);
            alert('Error al agregar a la lista de deseos.');
        }
    };

    return (
        <div className="home-container">
            <h1>Productos</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Buscar productos..."
            />
            <ul className="product-list">
                {filteredProducts.map(product => (
                    <li key={product.id} className="product-item">
                        <img src={product.imageUrl} alt={product.name} />
                        <h2>{product.name}</h2>
                        <button onClick={() => handleAddToWishlist(product)}>Agregar a Deseados</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
