 import { useEffect, useState } from 'react';
import Card from './Card';

const CardAPI = () => {
  const [products, setproducts] = useState([]); 
 

  const getUsers = async () => {
    try {
     
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      console.log(data);
      
      setproducts(data.products); 
    } catch (error) {
      console.error('Error fetching data:', error);
    } 
  };

  useEffect(() => {
    getUsers();
  }, []);

  

  return (
    <>
      <Card  products={products} />
    </>
  );
}

export default CardAPI;
