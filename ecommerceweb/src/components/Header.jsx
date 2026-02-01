import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { House, Sun } from "lucide-react";
import { useState } from "react";
import { useProduct } from "../context/ProductState";
import { useShopState } from "../context/ShopState";
import { useAuthState } from "../context/AuthState";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setCategory, setProduct, setPage, setReloadKey } = useProduct();
  const { cartItems } = useShopState();
  const { isLogin, logoutFunc } = useAuthState();

  const logoutHandlers = () => {
    logoutFunc()
    setOpen(false)
  }

  const handleCategoryReset = () => {
    setCategory("");
    setProduct([]);
    setPage(1);
    setReloadKey(prev => prev + 1);
    setOpen(false);
  };


  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full bg-white shadow-sm py-4 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* LOGO */}
            <Link
              to="/"
              onClick={handleCategoryReset}
              className="flex items-center gap-2"
            >
              <img className="h-12 max-sm:h-10" src={logo} alt="logo" />
              <h1 className="text-xl max-sm:text-sm font-semibold">
                <span className="text-black">PRABHAT</span>
                <span className="text-red-600 text-3xl max-sm:text-xl">CENTER</span>
              </h1>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-8">
              <Sun className="cursor-pointer" />

              <Link to="/carts" className="relative">
                <ShoppingCartIcon className="h-7 w-7" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems?.length || 0}
                </span>
              </Link>

              {isLogin ? (
                <button className="font-medium bg-red-500 py-2 px-4 rounded-sm text-white hover:bg-white hover:outline hover:outline-red-500 hover:text-red-600" onClick={logoutHandlers}>
                  Log Out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="font-medium bg-red-500 py-2 px-4 rounded-sm text-white hover:bg-white hover:outline hover:outline-red-500 hover:text-red-600"
                >
                  Log In
                </Link>)}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden"
              onClick={() => setOpen(true)}
            >
              <Bars3Icon className="h-8 w-8" />
            </button>

          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col p-4 gap-4">
          <Link onClick={handleCategoryReset} to="/" className="flex items-center gap-3">
            <House className="h-6 w-6" /> Home
          </Link>

          <Link to="/carts" onClick={() => setOpen(false)} className="flex items-center gap-3">
            <ShoppingCartIcon className="h-6 w-6" />
            Cart ({cartItems?.length || 0})
          </Link>

          {isLogin ? (
            <button className="w-full bg-red-500 text-white py-2 rounded-md" onClick={logoutHandlers}>
              Log Out
            </button>
          ) : (
            <Link to="/login" className="w-full bg-red-500 text-center text-white py-2 rounded-md" onClick={() => setOpen(false)}>
              Log In
            </Link>)}
        </div>
      </aside>

      {/* Spacer for fixed navbar */}
      <div className="h-24" />
    </>
  );
};

export default Header;
