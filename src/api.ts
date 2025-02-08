import axios from "axios";

const API_BASE_URL = "https://api.isbndb.com"; // Replace with actual API URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch books
export const fetchBooks = async () => {
  const response = await api.get("/books");
  return response.data;
};

// Fetch authors
export const fetchAuthors = async () => {
  const response = await api.get("/authors");
  return response.data;
};

// Fetch stores
export const fetchStores = async () => {
  const response = await api.get("/stores");
  return response.data;
};

export const addAuthor = async (name: string) => {
  const response = await api.post(`/authors`, { name });
  return response.data;
};

export const updateAuthor = async (id: number, name: string) => {
  const response = await api.put(`/authors/${id}`, { name });
  return response.data;
};

export const addBook = async (
  name: string,
  pages: number,
  authorId: number
) => {
  const response = await api.post("/books", { name, pages, authorId });
  return response.data;
};

export const updateBook = async (id: number, name: string) => {
  const response = await api.put(`/books/${id}`, { name });
  return response.data;
};

export const addStore = async (name: string, address: string) => {
  const response = await api.post(`/stores`, { name, address });
  return response.data;
};

export const updateStore = async (id: number, name: string) => {
  const response = await api.put(`/stores/${id}`, { name });
  return response.data;
};

export const fetchStoreBooks = async (storeId: number) => {
  const response = await api.get(`/stores/${storeId}/books`);
  return response.data;
};

export const fetchStoreAuthors = async (storeId: number) => {
  const response = await api.get(`/stores/${storeId}/authors`);
  return response.data;
};


export const addInventory = async (storeId: number, bookId: number, quantity: number) => {
  const response = await api.post("/inventory", { storeId, bookId, quantity });
  return response.data;
};