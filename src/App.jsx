
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CardAPI from './components/CardAPI';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';



const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CardAPI />} />
          <Route path="/product/:id" element={<ProductCard />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;


