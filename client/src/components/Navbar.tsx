import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );
  const logout = useAuthStore((state) => state.logout);

  const totalItems = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold">
          MY SHOP
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-gray-600">
            Home
          </Link>

          <Link to="/products" className="hover:text-gray-600">
            Products
          </Link>

          <Link to="/cart" className="hover:text-gray-600">
            Cart
            {totalItems > 0 && (
              <span className="ml-2 rounded-full bg-black px-2 py-1 text-xs text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated && user ? (
            <>
              <Link to="/profile" className="hover:text-gray-600">
                {user.name}
              </Link>

              <Link to="/orders" className="hover:text-gray-600">
                My Orders
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="hover:text-gray-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-600">
                Login
              </Link>

              <Link to="/register" className="hover:text-gray-600">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;