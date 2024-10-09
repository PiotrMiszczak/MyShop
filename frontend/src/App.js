import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Hedaer from './components/Header'
import HomePage from './views/HomePage'
import ProductPage from './views/ProductPage'
import CartPage from './views/CartPage'
import SinginPage from './views/SigninPage'
import RegisterPage from './views/RegisterPage'
import ProductAddPage from './views/ProductAddPage'
import ShippingPage from './views/ShippingPage'
import PaymentPage from './views/PaymentPage'
import SummaryPage from './views/SummaryPage'
import OrderPage from './views/OrderPage';
import MyOrderPage from './views/MyOrdersPage'
import AllOrdersPage from './views/AllOrdersPage';



function App() {
  return (
    <Router>
    <div id="page-container">
    <div id="content-wrap">
    <Hedaer />

    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signin' element={<SinginPage />} />
      <Route path='/products' element={<ProductAddPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/products/:_id' element={<ProductPage />} />
      <Route path='/cart/:_id?' element={<CartPage />} />
      <Route path='/shipping' element={<ShippingPage />} />
      <Route path='/payment' element={<PaymentPage />} />
      <Route path='/summary' element={<SummaryPage />} />
      <Route path='/orders/:_id' element={<OrderPage />} />
      <Route path='/myorders' element={<MyOrderPage />} />
      <Route path='/orders' element={<AllOrdersPage />} />
    </Routes>
    </div>
    
    <footer id="footer">Rigths reserved</footer>
    </div>
    </Router>
  );
}

export default App;
