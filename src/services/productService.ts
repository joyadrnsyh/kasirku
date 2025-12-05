import axios from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1/products";

const productService = {
  // Ambil semua produk
  getAllProducts: async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  // Ambil produk berdasarkan ID
  getProductById: async (id: number) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  // Bisa ditambah endpoint lain jika API mendukung create/update/delete
};

export default productService;
