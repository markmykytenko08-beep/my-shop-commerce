import { useCartStore } from "../store/cartStore";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold">Your Cart</h1>

        <p className="mt-6 text-gray-600">
          Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Cart</h1>

        <button
          onClick={clearCart}
          className="text-sm text-red-600 hover:underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="mt-8 space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-6 rounded-lg border p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-32 w-32 rounded object-cover"
            />

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {item.name}
                </h2>

                <p className="mt-2">
                  €{item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center rounded border">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-3 py-1"
                  >
                    −
                  </button>

                  <span className="px-4">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-3 py-1"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="font-semibold">
              €{(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <div className="w-full max-w-sm rounded-lg border p-6">
          <h2 className="text-xl font-semibold">
            Order Summary
          </h2>

          <div className="mt-4 flex justify-between">
            <span>Subtotal</span>

            <span>
              €{subtotal.toFixed(2)}
            </span>
          </div>

          <div className="mt-2 flex justify-between">
            <span>Shipping</span>

            <span>Free</span>
          </div>

          <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
            <span>Total</span>

            <span>
              €{subtotal.toFixed(2)}
            </span>
          </div>

          <button
            className="mt-6 w-full rounded-lg bg-black px-6 py-3 text-white"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}