import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Card from './Card';

const CardAPI = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      console.log(data);

      // Ensure that data is in the expected format
      if (data && data.products && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Filter products based on searchQuery
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Card products={filteredProducts} />
    </>
  );
}

// Define PropTypes for the CardAPI component
CardAPI.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default CardAPI;
