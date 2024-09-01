import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import { useCart } from './CartContext';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  // Toggles the menu for mobile view
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handles search input changes and performs search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update searchQuery state when input changes
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`); // Navigate to the search results page with the query
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-900 px-4 py-3 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo part */}
        <div className="flex items-center">
          <img
            src="logo.jpg"
            alt="Apna Bazar"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white"
          />
          <div className="ml-2 sm:ml-3 text-white">
            <Link to="/" className="font-bold text-lg sm:text-2xl tracking-wide">
              Apna Bazar
            </Link>
            <span className="text-xs sm:text-sm block tracking-wide">
              Your Shopping Hub
            </span>
          </div>
        </div>

        {/* Menu Links for Desktop */}
        <div className="hidden lg:flex items-center space-x-6 sm:space-x-8 text-white lg:ml-12">
          <Link to="/" className="hover:text-yellow-500">
            Orders
          </Link>
          <Link to="/" className="hover:text-yellow-500">
            Favorite
          </Link>
          <Link to="/cart" className="hover:text-yellow-500 flex items-center relative">
            {/* Cart Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l1.68 8.39M7.5 21h9a2.5 2.5 0 100-5h-9a2.5 2.5 0 100 5zM3 3h18l-1.68 8.39m-11.94 0h7.44m-7.44 0l-2.64 7.91m10.08-7.91l2.64 7.91M7.5 21a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm9 0a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"
              />
            </svg>
            Cart
            {/* Cart Count */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Search Bar for Desktop */}
        <div className="hidden lg:block lg:flex-1 mx-4 sm:mx-6 relative">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products, brands..."
              onChange={handleSearchChange} // Update search query state
              value={searchQuery} // Bind input value to state
              className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button type="submit" className="absolute right-2 top-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M10.5 18.5a7 7 0 100-14 7 7 0 000 14z"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Login Button for Desktop */}
        <Link
          to="#"
          className="hidden lg:inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 hover:text-yellow-500 shadow-md transition-colors duration-300 ease-in-out"
        >
          Login
        </Link>

        {/* Menu Button for Small Screens */}
        <div className="lg:hidden flex items-center">
          <button
            className="text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Small Screen Menu Dropdown */}
      <div
        id="mobile-menu"
        className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-blue-900 text-white px-6 py-3 space-y-4`}
      >
        <Link to="/" className="block hover:text-yellow-500">
          Orders
        </Link>
        <Link to="/" className="block hover:text-yellow-500">
          Favorite
        </Link>
        <Link to="/cart" className=" hover:text-yellow-500 flex items-center relative">
          {/* Cart Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l1.68 8.39M7.5 21h9a2.5 2.5 0 100-5h-9a2.5 2.5 0 100 5zM3 3h18l-1.68 8.39m-11.94 0h7.44m-7.44 0l-2.64 7.91m10.08-7.91l2.64 7.91M7.5 21a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm9 0a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"
            />
          </svg>
          Cart
          {/* Cart Count */}
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Search Bar for Small Screens */}
        <div className="block lg:hidden my-2 relative text-black">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products, brands..."
              onChange={handleSearchChange} // Update search query state
              value={searchQuery} // Bind input value to state
              className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button type="submit" className="absolute right-2 top-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M10.5 18.5a7 7 0 100-14 7 7 0 000 14z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

// Define PropTypes for the Navbar component
Navbar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default Navbar;
