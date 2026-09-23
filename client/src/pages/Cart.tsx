import { Link } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";
import { useCartStore } from "../store/cartStore";

function Cart() {
  const items = useCartStore((state) => state.items);

  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <section className="py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              Your cart is empty
            </h1>

            <p className="mt-4 text-gray-600">
              Add some products to your cart.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block"
            >
              <Button>Browse Products</Button>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16">
      <Container>
        <h1 className="mb-10 text-4xl font-bold">
          Your Cart
        </h1>

        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 rounded-xl border p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h2 className="font-semibold">
                  {item.name}
                </h2>

                <p className="mt-2 text-gray-600">
                  €{item.price.toFixed(2)}
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded border hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="w-6 text-center font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded border hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-end border-t pt-6">
          <div className="text-right">
            <p className="text-sm text-gray-500">
              Total
            </p>

            <p className="mt-1 text-3xl font-bold">
              €{total.toFixed(2)}
            </p>

            <Link
              to="/checkout"
              className="mt-4 inline-block"
            >
              <Button>Checkout</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Cart;