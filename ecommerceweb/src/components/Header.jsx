import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { Sun } from "lucide-react";
import { useProduct } from "../context/ProductState";

const Header = () => {

 const { setCategory, setProduct, setPage, setReloadKey } = useProduct();

 const handleCategoryReset = () => {
    setCategory("");
    setProduct([]);
    setPage(1);
    setReloadKey(prev => prev + 1);
 }


  return (
    <nav className="w-full bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex gap-16">
            <Link to="/" className="flex items-center gap-2" onClick={handleCategoryReset}>
              <img className="h-15" src={logo} alt="" />
              <h1 className="text-xl font-semibold">
                <span className="text-black">PRABHAT</span>
                <span className="text-red-600 text-3xl">CENTER</span>
              </h1>
            </Link>
          </div>


          <div className="flex items-center gap-12">
            <form className="relative flex items-center shadow-sm rounded-lg">
              <i className="absolute fa fa-search text-gray-400 top-5 left-4"></i>
              <input type="text" className="bg-white h-12 w-full pl-12 pr-3 rounded-lg focus:outline-none hover:cursor-pointer" name="" placeholder="Search here..." />
              <button type="submit" className=" font-medium bg-red-500 py-2 px-4 mr-2 rounded-sm text-white hover:bg-red-600">Search</button>
            </form>

            <button className="relative cursor-pointer">
              <Sun />
            </button>
            <Link to="/carts" className="relative cursor-pointer">
              <ShoppingCartIcon className="h-7 w-7 text-black" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                5
              </span>
            </Link>

            {/* Login */}
            <Link
              to="/login"
              className="font-medium bg-red-500 py-2 px-4 rounded-sm text-white hover:bg-white hover:outline-1 hover:outline-red-500 hover:text-red-600"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
