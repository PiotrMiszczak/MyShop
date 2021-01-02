import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
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
    <Switch>
      <Route exact path='/'>
      <HomePage />
    </Route>
    <Route path='/signin'>
      <SinginPage />
    </Route>
    <Route exact path='/products'>
      <ProductAddPage />
    </Route>
    <Route path='/register'>
      <RegisterPage />
    </Route>
    <Route path='/products/:_id'>
    <ProductPage />
    </Route>
    <Route path='/cart/:_id?'>
    <CartPage />
    </Route>
    <Route path='/shipping'>
    <ShippingPage />
    </Route>
    <Route path='/payment'>
    <PaymentPage />
    </Route>
    <Route path='/summary'>
    <SummaryPage />
    </Route>
    <Route path='/orders/:_id'>
    <OrderPage />
    </Route>
    <Route path='/myorders'>
    <MyOrderPage />
    </Route>
    <Route path='/orders'>
    <AllOrdersPage />
    </Route>
    </Switch>
    </div>
    
    <footer id="footer">Rigths reserved</footer>
    </div>
    </Router>
  );
}

export default App;
