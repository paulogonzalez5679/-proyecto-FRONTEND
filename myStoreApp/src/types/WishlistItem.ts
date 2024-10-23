export interface WishlistItem {
    userId: number; // ID del usuario
    productId: number; // ID del producto
    product: {
        id: number; // ID del producto
        name: string; // Nombre del producto
        price: number; // Precio del producto
        imageUrl: string; // URL de la imagen
        categoryId: number; // ID de la categoría
        category: {
            id: number; // ID de la categoría
            name: string; // Nombre de la categoría
            products: any[]; // Puedes definir más estrictamente si es necesario
        };
    };
}