import Container from "../components/Container";
import Button from "../components/Button";

function Checkout() {
  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold">
            Checkout
          </h1>

          <p className="mt-3 text-gray-600">
            Enter your information to complete your order.
          </p>

          <form className="mt-10 space-y-8">
            <div>
              <h2 className="mb-4 text-xl font-semibold">
                Contact information
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="First name"
                  className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                <input
                  type="text"
                  placeholder="Last name"
                  className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black md:col-span-2"
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
        </div>
      </Container>
    </section>
  );
}

export default Checkout;