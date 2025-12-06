import axios from "axios";

const API1 = "https://dummyjson.com/products";
const API2 = "https://fakestoreapi.com/products";

const productService = {
  getAllProducts: async () => {
    const [res1, res2] = await Promise.all([
      axios.get(API1),
      axios.get(API2),
    ]);

    const products1 = res1.data.products.map((p: any) => ({
      id: Number(p.id),
      title: p.title,
      price: Number(p.price),
      description: p.description,
      category: { id: 0, name: p.category, image: "", slug: "" },
      images: p.images?.map((img: string) => img) || ["/placeholder.png"],
    }));

    const products2 = res2.data.map((p: any, index: number) => ({
      id: Number(p.id) + 1000, // offset supaya tidak bentrok dengan API1
      title: p.title,
      price: Number(p.price),
      description: p.description,
      category: { id: 0, name: p.category, image: "", slug: "" },
      images: p.image ? [p.image] : ["/placeholder.png"],
    }));

    return [...products1, ...products2];
  },

  getProductById: async (id: number) => {
    const res = await axios.get(`${API1}/${id}`);
    const p = res.data;
    return {
      id: Number(p.id),
      title: p.title,
      price: Number(p.price),
      description: p.description,
      category: { id: 0, name: p.category, image: "", slug: "" },
      images: p.images || ["/placeholder.png"],
    };
  },
};

export default productService;
