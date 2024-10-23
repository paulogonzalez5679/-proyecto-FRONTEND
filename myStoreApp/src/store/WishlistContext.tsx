import React, { createContext, useContext, useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

interface WishlistContextProps {
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (id: number) => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<Product[]>([]);

    const addToWishlist = (product: Product) => {
        setWishlist((prev) => [...prev, product]);
        // Aquí se puede agregar lógica para persistir en el almacenamiento local
    };

    const removeFromWishlist = (id: number) => {
        setWishlist((prev) => prev.filter((item) => item.id !== id));
        // Aquí se puede agregar lógica para persistir en el almacenamiento local
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
