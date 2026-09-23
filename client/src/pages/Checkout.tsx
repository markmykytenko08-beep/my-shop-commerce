import Container from "../components/Container";
import Button from "../components/Button";
import { useCartStore } from "../store/cartStore";

function Checkout() {
  const items = useCartStore((state) => state.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold">
            Checkout
          </h1>

          <p className="mt-3 text-gray-600">
            Enter your information to complete your order.
          </p>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <form className="space-y-8">
              <div>
                <h2 className="mb-4 text-xl font-semibold">
                  Contact information
                </h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />

                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-semibold">
                  Shipping address
                </h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Street address"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      placeholder="City"
                      className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />

                    <input
                      type="text"
                      placeholder="Postal code"
                      className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-semibold">
                  Payment
                </h2>

                <div className="rounded-lg border border-gray-300 p-4">
                  <p className="font-medium">
                    Payment method
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Payment integration will be added later.
                  </p>
                </div>
              </div>

              <Button>
                Place Order
              </Button>
            </form>

            <div>
              <h2 className="mb-4 text-xl font-semibold">
                Order summary
              </h2>

              <div className="space-y-4 rounded-xl border p-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    /><div className="flex-1">
                      <p className="font-medium">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-medium">
                      €
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>

                    <span>
                      €{total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Checkout;