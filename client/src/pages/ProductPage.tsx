import { Link, useParams } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";
import { products } from "../data/products";
import { useCartStore } from "../store/cartStore";

function ProductPage() {
  const { id } = useParams();

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product) {
    return (
      <section className="py-16">
        <Container>
          <h1 className="text-3xl font-bold">
            Product not found
          </h1>

          <Link
            to="/products"
            className="mt-6 inline-block underline"
          >
            Back to products
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16">
      <Container>
        <Link
          to="/products"
          className="mb-8 inline-block text-sm text-gray-600 hover:text-black"
        >
          ← Back to products
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl border">
            <img
              src={product.image}
              alt={product.name}
              className="h-full max-h-[500px] w-full object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-500">
              {product.category}
            </p>

            <h1 className="text-4xl font-bold">
              {product.name}
            </h1>

            <p className="mt-4 text-3xl font-bold">
              €{product.price.toFixed(2)}
            </p>

            <p className="mt-6 leading-7 text-gray-600">
              {product.description}
            </p>

            <p className="mt-6 text-sm">
              <span className="font-medium">In stock:</span>{" "}
              {product.stock} items
            </p>

            <div className="mt-8">
              <Button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                  })
                }
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ProductPage;