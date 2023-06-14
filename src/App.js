import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import useOrderUpdate from './__hooks/useOrderUpdate';
import OrdersPage from './screens/OrdersPage';
import NewOrderPage from './screens/NewOrder';
import Navbar from './components/navbar';
import "./App.css"



const App = () => {

  const orders = useOrderUpdate();

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<OrdersPage orders={orders} />} />
          <Route path="/new-order" element={<NewOrderPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


