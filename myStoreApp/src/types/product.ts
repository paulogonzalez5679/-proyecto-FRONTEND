
export interface ProductCategory {
    id: number;
    name: string;
    products: Product[];
}

export interface Product {
    id: number;
    name: string;
    price: number;
    categoryId: number; 
    imageUrl: string;
    category: ProductCategory; 
}