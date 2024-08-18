import { useCart } from './CartContext'; 
import { useEffect, useCallback, useState } from 'react';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();
  const [totals, setTotals] = useState({ totalPrice: 0, totalDiscount: 0 });
  const [removalMessage, setRemovalMessage] = useState(''); 

  // Calculate the total price and discount
  const calculateTotal = useCallback(() => {
    let totalPrice = 0;
    let totalDiscount = 0;

    cartItems.forEach(item => {
      const quantity = item.minimumOrderQuantity; 
      if (item.price) {
        totalPrice += item.price * quantity;
        totalDiscount += (item.price * item.discountPercentage) / 100 * quantity;
      }
    });

    setTotals({ totalPrice, totalDiscount });
  }, [cartItems]);

  useEffect(() => {
    calculateTotal(); // Calculate totals whenever the cartItems change
  }, [cartItems, calculateTotal]);

  const handleRemoveFromCart = (item) => {
    removeFromCart(item.id);
    setRemovalMessage(`${item.title} was removed from your cart.`);
    setTimeout(() => {
      setRemovalMessage(''); // Clear the message after 3 seconds
    }, 3000);
  };

  // Handle quantity changes
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity >= 1) {
      updateCartItemQuantity(item.id, newQuantity); // Update quantity in the cart context
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row justify-between mt-14">
      <div className="lg:w-2/3">
        <h1 className="text-2xl font-extrabold mb-6 text-center text-white bg-gradient-to-r bg-yellow-700 p-3 rounded-lg">
          YOUR CART ITEM
        </h1>
        {removalMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{removalMessage}</span>
          </div>
        )}
        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-xl font-bold text-gray-700 bg-yellow-100 px-4 py-2 rounded-md">
              NO ITEM IS ADDED IN YOUR CART
            </p>
          </div>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="border-b border-gray-300 py-4 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                    <div className="text-gray-700 mt-2">
                      <span className="line-through mr-2">₹{1000}</span>
                      <span className="font-bold text-green-600">₹{item.price}</span>
                      <span className="ml-2 text-sm text-green-500">{item.discountPercentage}% off</span>
                      <p className="text-sm text-yellow-500">
                        Rating: {item.rating} ★
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => handleQuantityChange(item, item.minimumOrderQuantity - 1)}
                      className="px-2 font-bold"
                    >
                      -
                    </button>
                    <span className="px-3">{item.minimumOrderQuantity}</span> 
                    <button
                      onClick={() => handleQuantityChange(item, item.minimumOrderQuantity + 1)}
                      className="px-2 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item)}
                    className="ml-4 mt-2 md:mt-0 bg-red-500 text-white py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Price details card */}
      <div className="lg:w-1/3 lg:ml-6 mt-8 lg:mt-0">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Price Details</h2>
          <div className="flex justify-between mb-2">
            <span>Price ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</span>
            <span>₹{totals.totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount</span>
            <span className="text-green-600">- ₹{totals.totalDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery Charges</span>
            <span className="text-green-600">Free</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold text-xl">
            <span>Total Amount</span>
            <span>₹{(totals.totalPrice - totals.totalDiscount).toFixed(2)}</span>
          </div>
          <p className="text-green-600 text-sm mt-2">You will save ₹{totals.totalDiscount.toFixed(2)} on this order</p>
          <button className="mt-4 bg-orange-500 text-white py-2 px-4 w-full rounded-lg">
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
