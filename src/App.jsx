import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CardAPI from './components/CardAPI';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';
import { useState } from 'react';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <CartProvider>
      <Router>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path="/" element={<CardAPI searchQuery={searchQuery} />} />
          <Route path="/search" element={<CardAPI searchQuery={searchQuery} />} />
          <Route path="/product/:id" element={<ProductCard />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
