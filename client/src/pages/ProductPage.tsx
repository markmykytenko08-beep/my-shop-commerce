import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { useCartStore } from "../store/cartStore";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  category: {
    id: number;
    name: string;
  };
};

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const addToCart = useCartStore((state) => state.addToCart);

  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`);
      return response.data;
    },
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p>Loading product...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-2xl font-bold">Product not found</h1>

        <p className="mt-2 text-gray-600">
          The product you are looking for does not exist.
        </p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg object-cover"
          />
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-500">
            {product.category.name}
          </p>

          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="mt-4 text-2xl font-semibold">
            €{product.price.toFixed(2)}
          </p>

          <p className="mt-6 text-gray-600">
            {product.description}
          </p>

          <p className="mt-6">
            {product.stock > 0 ? (
              <span className="text-green-600">
                In stock: {product.stock}
              </span>
            ) : (
              <span className="text-red-600">
                Out of stock
              </span>
            )}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="mt-8 rounded-lg bg-black px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}