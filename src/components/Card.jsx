import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext'; 
import { useState } from 'react';

const Card = ({ products }) => {
  const { addToCart } = useCart();
  const [addedProductId, setAddedProductId] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 3000); // Message will disappear after 3 seconds
  };

  // Function to truncate title
  const truncateTitle = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen flex items-center justify-center mt-14">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative bg-white border border-gray-300 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl max-w-sm mx-auto" // Adjusted max-w-sm for wider cards
            >
              <Link
                to={`/product/${product.id}`} // Linking to ProductCard with product ID
                className="block"
              >
                <div className="relative">
                  <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-tr-lg rounded-bl-lg">
                    {product.discountPercentage}% OFF
                  </span>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-40 object-cover rounded-t-lg" // Adjusted height
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {truncateTitle(product.title, 17)}
                  </h3>
                  <p className="text-sm font-semibold text-blue-500">
                    Brand: <span className="text-blue-600">{product.brand}</span>
                  </p>
                  <div className="mt-2 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-lg font-bold text-green-600">
                      ₹{product.price}
                    </p>
                    <p className="text-sm text-gray-500 line-through">
                      ₹{10000}
                    </p>
                    <p className="text-xs text-green-600">
                      {product.discountPercentage}% off
                    </p>
                  </div>
                  <div className="mt-2 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-sm text-yellow-500">
                      Rating: {product.rating} ★
                    </p>
                    <p className="text-sm font-semibold text-red-600">
                      In Stock: {product.stock}
                    </p>
                  </div>
                  <p className="text-xs text-green-600 mt-2">Free Delivery</p>
                </div>
              </Link>
              <div className="flex flex-col md:flex-row mt-4 space-y-2 md:space-y-0 md:space-x-2 p-4">
                <button className="w-24 h-10 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-700 flex items-center justify-center whitespace-nowrap overflow-hidden text-ellipsis">
                  FAVORITE
                </button>
                <button
                  onClick={() => handleAddToCart(product)} // Cart Button Handle
                  className="w-24 h-10 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-700 flex items-center justify-center whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  ADD CART
                </button>
              </div>
              {addedProductId === product.id && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg z-50 text-center">
                  {product.title} is Successfully added to cart! {/* Message showing after adding to cart */}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          <p className="mt-4 text-gray-800 font-bold text-lg">
            Loading... {/* Showing loading when data is being fetched */}
          </p>
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      thumbnail: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      discountPercentage: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Card;
