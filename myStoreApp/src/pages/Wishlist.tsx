import React from 'react';
import { useWishlist } from '../store/WishlistContext';

const Wishlist: React.FC = () => {
    const { wishlist, removeFromWishlist } = useWishlist();

    return (
        <div>
            <h1>Productos Deseados</h1>
            <ul>
                {wishlist.map(item => (
                    <li key={item.id}>
                        <h2>{item.name}</h2>
                        <button onClick={() => removeFromWishlist(item.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wishlist;
