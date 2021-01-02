
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import productListReducer from './reducers/productListReducer';
import productItemReducer from './reducers/productItemReducer';
import cartReducer from './reducers/cartReducer';
import signinReducer from './reducers/signinReducer';
import saveProductReducer from './reducers/saveProductReducer';
import deleteProductReducer from './reducers/deleteProductReducer';
import {saveOrderReducer, detailsOrderReducer, payOrderReducer, myOrdersReducer, listOrdersReducer, deliverOrderReducer} from './reducers/orderReducer';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie'


const cartItems = Cookie.getJSON('cartItems') || [] // Local storage?
const userInfo = Cookie.getJSON('userInfo') || null

const initialState = {cart: {cartItems}, userData:{userInfo} }
const reducer = combineReducers({
    products: productListReducer,
    product: productItemReducer,
    cart: cartReducer,
    userData: signinReducer,
    saveProduct: saveProductReducer,
    deleteProduct: deleteProductReducer,
    createdOrder: saveOrderReducer,
    orderDetails: detailsOrderReducer,
    orderPay: payOrderReducer,
    orderDeliver: deliverOrderReducer,
    myOrders: myOrdersReducer,
    listOrders: listOrdersReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)))


export default store;
