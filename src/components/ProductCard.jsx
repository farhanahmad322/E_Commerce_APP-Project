import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from './CartContext'; 

const ProductCard = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000); // this part Message disappears in 3 seconds
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-full mt-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <p className="mt-4 text-gray-800 font-bold text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 relative mt-20">
      <div className="flex">
      
        <div className="w-1/3 relative">

          {/* Discount  Percentage */}
          {product.discountPercentage && (
            <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-tr-lg rounded-bl-lg">
              {product.discountPercentage}% OFF
            </span>
          )}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full mb-2 rounded-lg object-cover border border-gray-300"
          />
        </div>

        {/* Product Detail */}
        <div className="w-2/3 pl-4">
          <h2 className="text-xl font-bold">{product.title}</h2>
          <p className="text-gray-600">{product.description}</p>

          {/* Price Section */}
          <div className="mt-4">
            <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
            <p className="text-sm text-gray-500 line-through">₹{10000} </p>
            {product.discountPercentage && (
              <span className="text-sm text-red-500 ml-2">{product.discountPercentage}% off</span>
            )}
          </div>

          {/* Offers Part */}
          {product.offers && product.offers.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700">Available offers</h3>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {product.offers.map((offer, index) => (
                  <li key={index}>{offer}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Warranty and Delivery */}
          {product.warrantyInformation && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700">Warranty</h3>
              <p className="text-sm text-gray-700">{product.warrantyInformation}</p>
            </div>
          )}
          {product.shippingInformation && (
            <div className="mt-4">
              <p className="text-sm text-gray-700">{product.shippingInformation}</p>
            </div>
          )}

          {/* Allert Button */}
          {product.dimensions && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700">Dimensions</h3>
              <p className="text-sm text-gray-700">
                Width: {product.dimensions.width} cm, 
                Height: {product.dimensions.height} cm, 
                Depth: {product.dimensions.depth} cm
              </p>
            </div>
          )}

         
          <div className="mt-6 flex space-x-2">
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
            >
              ADD TO CART
            </button>
            <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600">
              BUY NOW
            </button>
          </div>

          {/* Seller Information */}
          {product.seller && (
            <div className="mt-4">
              <p className="text-sm text-gray-700">
                Seller: <span className="font-semibold">{product.seller}</span>
                {product.rating && (
                  <span className="text-blue-600 ml-2">Rating: {product.rating} ★</span>
                )}
              </p>
              <p className="text-sm text-gray-700">10 days return policy</p>
            </div>
          )}

          {/* Customer Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700">Customer Reviews</h3>
              {product.reviews.map((review, index) => (
                <div key={index} className="mt-2 border-t pt-2">
                  <p className="text-sm text-gray-800 font-semibold">
                    {review.reviewerName} ({review.rating} ★)
                  </p>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                  <p className="text-xs text-gray-500">Reviewed on: {new Date(review.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Success Message */}
      {addedToCart && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg z-50 text-center opacity-80">
        successfully added to cart!
         </div>
      )}
    </div>
  );
};

export default ProductCard;
