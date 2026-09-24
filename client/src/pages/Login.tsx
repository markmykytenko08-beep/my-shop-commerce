import { Link } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";

function Login() {
  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto max-w-md">
          <h1 className="text-4xl font-bold">
            Login
          </h1>

          <p className="mt-3 text-gray-600">
            Sign in to your account.
          </p>

          <form className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <Button>
              Login
            </Button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-black underline"
            >
              Register
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}

export default Login;