import { Product } from "../types/product";

const API_BASE_URL = 'https://clinikally-api.vercel.app/api';

export const fetchProduct = async (productId: number) => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
};

export const fetchPincodeDetails = async (pincode: number) => {
  const response = await fetch(`${API_BASE_URL}/pincode/${pincode}`);
  if (!response.ok) {
    throw new Error('Failed to fetch pincode details');
  }
  return response.json();
};

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export const fetchProducts = async (page: number, limit: number = 10): Promise<PaginatedResponse<Product>> => {
  const response = await fetch(
    `${API_BASE_URL}/products?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
};

export const fetchCartItems = async () => {
  const response = await fetch(`${API_BASE_URL}/cart`);
  if (!response.ok) throw new Error('Failed to fetch cart items');
  return response.json();
};

export const updateCartItemQuantity = async (productId: number, quantity: number) => {
  const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) throw new Error('Failed to update quantity');
  return response.json();
};

export const removeFromCart = async (productId: number) => {
  const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to remove item');
  return response.json();
};