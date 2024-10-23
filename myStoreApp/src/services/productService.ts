import axios from 'axios';

const API_URL = 'http://localhost:5259/api/Products';

export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getProductById = async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const addToWishlist = async (wishlistItem: { userId: number; productId: number; product: any }) => {
    const response = await axios.post(`${API_URL}/wishlist`, wishlistItem);
    return response.data;
};

export const getWishlist = async (userId: number) => {
    const response = await axios.get(`${API_URL}/wishlist/${userId}`);
    return response.data;
};

export const removeFromWishlist = async (id: number) => {
    await axios.delete(`${API_URL}/wishlist/${id}`);
};

export const getProductsByCategory = async (categoryId: number) => {
    const response = await axios.get(`${API_URL}/products?categoryId=${categoryId}`);
    return response.data; 
};
export const getCategoryById = async (categoryId: number) => {
    const response = await axios.get(`${API_URL}/categoryID/${categoryId}`);
    return response.data; 
};