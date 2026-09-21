import { Link } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";


const categories = [
  "Electronics",
  "Clothing",
  "Home",
  "Sports",
];

function Home() {
  return (
    <>
      <section className="py-20">
        <Container>
          <div className="flex flex-col items-center text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-gray-500">
              Welcome to My Shop
            </p>

            <h1 className="max-w-3xl text-5xl font-bold tracking-tight">
              Everything you need. One simple store.
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-gray-600">
              Discover quality products at fair prices.
            </p>

            <div className="mt-8">
              <Link to="/products">
                <Button>Shop now</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t py-16">
        <Container>
          <h2 className="mb-8 text-3xl font-bold">
            Categories
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category}
                to="/products"
                className="rounded-xl border p-6 text-center font-medium transition hover:bg-gray-100"
              >
                {category}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t py-16">
  <Container>
    <div className="mb-8 flex items-center justify-between">
      <h2 className="text-3xl font-bold">
        Featured Products
      </h2>

      <Link
        to="/products"
        className="text-sm font-medium hover:underline"
      >
        View all
      </Link>
    </div>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  </Container>
</section>
    </>
  );
}

export default Home;