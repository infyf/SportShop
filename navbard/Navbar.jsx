import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Headphones, Heart, User, ShoppingCart, Menu } from 'lucide-react';
import AuthForm from "../Auth/AuthForm";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthFormVisible, setAuthFormVisible] = useState(false);  
  const [isAuthenticated, setIsAuthenticated] = useState(false);  
  const navigate = useNavigate();
  const { wishlist } = useWishlist();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleAuthFormToggle = () => {
    setAuthFormVisible(!isAuthFormVisible);  
  };

  const handleLogout = () => {
    setIsAuthenticated(false);  
  };

  return (
    <header>
      <nav className="bg-gradient-to-r from-purple-600 to-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-white text-2xl font-bold">
              SPORTSPIDER
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-white px-3 py-1 rounded-md transition-all duration-300 hover:bg-white/20"
              >
                Home
              </Link>
              <Link 
                to="/catalog" 
                className="text-white px-3 py-1 rounded-md transition-all duration-300 hover:bg-white/20"
              >
                Каталог товарів
              </Link>
              <Link 
                to="/add-products" 
                className="text-white px-3 py-1 rounded-md transition-all duration-300 hover:bg-white/20"
              >
                Розміщення товарів
              </Link>
            </div>

            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-white hover:text-gray-200">
                  <User size={24} />
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  onClick={handleLogout}  
                >
                  Вийти
                </button>
              </>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleAuthFormToggle}  
              >
                Вхід/Реєстрація
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="bg-gray-900 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              to="/catalog"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
            >
              <Menu size={20} />
              Каталог товарів
            </Link>

            <form onSubmit={handleSearch} className="flex-1 relative">
              <input
                type="text"
                placeholder="Що ви шукаєте?"
                className="w-full py-2 px-4 pr-12 rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 bg-gray-600 rounded-r hover:bg-gray-700"
              >
                <Search size={20} className="text-white" />
              </button>
            </form>

            <div className="flex items-center gap-6 text-white">
              <button className="flex items-center gap-2 hover:text-gray-300">
                <Headphones size={20} />
                <span className="hidden md:inline">Зворотній зв'язок</span>
              </button>

              <Link to="/wishlist" className="relative hover:text-gray-300">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button className="hover:text-gray-300">
                <User size={20} />
              </button>

              <button className="relative hover:text-gray-300">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isAuthFormVisible && (
        <AuthForm
          closeForm={handleAuthFormToggle}  
          setIsAuthenticated={setIsAuthenticated} 
        />
      )}
    </header>
  );
};

export default Navbar;
