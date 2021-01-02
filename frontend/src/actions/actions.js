import axios from 'axios';
import Cookie from 'js-cookie';

export const PRODUCT_LIST_REQEST = 'PRODUCT_LIST_REQEST'
export const PRODUCT_LIST_SUCCES = 'PRODUCT_LIST_SUCCES'
export const PRODUCT_LIST_ERROR = 'PRODUCT_LIST_ERROR'
export const PRODUCT_ITEM_REQEST = 'PRODUCT_ITEM_REQEST'
export const PRODUCT_ITEM_SUCCES = 'PRODUCT_ITEM_SUCCES'
export const PRODUCT_ITEM_ERROR = 'PRODUCT_ITEM_ERROR'
export const PRODUCT_SAVE_ERROR = 'PRODUCT_SAVE_ERROR'
export const PRODUCT_SAVE_SUCCES = 'PRODUCT_SAVE_SUCCES'
export const PRODUCT_SAVE_REQEST = 'PRODUCT_SAVE_REQEST'
export const PRODUCT_DELETE_ERROR = 'PRODUCT_DELETE_ERROR'
export const PRODUCT_DELETE_SUCCES = 'PRODUCT_DELETE_SUCCES'
export const PRODUCT_DELETE_REQEST = 'PRODUCT_DELETE_REQEST'
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const SIGNIN_SUCCES = 'SIGNIN_SUCCEED'
export const SIGNIN_FAILED = 'SIGNIN_FAILED'
export const CART_SHIPPING = 'CART_SHIPPING'
export const CART_PAYMENT = 'CART_PAYMENT'
export const CART_EMPTY = 'CART_EMPTY'
export const ORDER_SAVE_ERROR = 'ORDER_SAVE_ERROR'
export const ORDER_SAVE_SUCCES = 'ORDER_SAVE_SUCCES'
export const ORDER_SAVE_REQUEST = 'ORDER_SAVE_REQUEST'
export const ORDER_RESET = 'ORDER_RESET'
export const ORDER_DETAILS_ERROR = 'ORDER_DETAILS_ERROR'
export const ORDER_DETAILS_SUCCES = 'ORDER_DETAILS_SUCCES'
export const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST'
export const ORDER_PAY_ERROR = 'ORDER_PAY_ERROR'
export const ORDER_PAY_SUCCES = 'ORDER_PAY_SUCCES'
export const ORDER_PAY_REQUEST = 'ORDER_PAY_REQUEST'
export const ORDER_DELIVER_ERROR = 'ORDER_DELIVER_ERROR'
export const ORDER_DELIVER_SUCCES = 'ORDER_DELIVER_SUCCES'
export const ORDER_DELIVER_REQUEST = 'ORDER_DELIVER_REQUEST'
export const ORDER_PAY_RESET = 'ORDER_PAY_RESET'
export const MYORDERS_ERROR = 'MYORDERS_ERROR'
export const MYORDERS_REQUEST = 'MYORDERS_REQUEST'
export const MYORDERS_SUCCES = 'MYORDERS_SUCCES'
export const SIGN_OUT = 'SIGN_OUT'
export const LIST_ORDERS_REQUEST = 'LIST_ORDERS_REQUEST'
export const LIST_ORDERS_SUCCES = 'LIST_ORDERS_SUCCES'
export const LIST_ORDERS_ERROR = 'LIST_ORDERS_ERROR'


const getRequest = () => async (dispatch) =>{
    try{
    dispatch({type:PRODUCT_LIST_REQEST})
    const  resp  = await axios.get('api/products')
    dispatch({type:PRODUCT_LIST_SUCCES, payload:resp.data})
    }
    catch(err){
        dispatch({type:PRODUCT_LIST_ERROR})
    }
}

const getRequestItem = (_id) => async (dispatch) =>{
    try{
    dispatch({type:PRODUCT_ITEM_REQEST})
    const  resp  = await axios.get(`api/products/${_id}`)
    dispatch({type:PRODUCT_ITEM_SUCCES, payload:resp.data})
    }
    catch(err){
        dispatch({type:PRODUCT_ITEM_ERROR})
    }
}

const addItem = (_id,qty) => async (dispatch, getState)=>{
    try {
        const  resp  = await axios.get(`api/products/${_id}`)

        dispatch({type:ADD_ITEM_TO_CART, payload:{
            _id: resp.data._id,
            name:resp.data.name,
            price:resp.data.price,
            avatar: resp.data.avatar,
            available: resp.data.qty,
            qty

        }})

const {cart:{cartItems}} = getState()
Cookie.set('cartItems', JSON.stringify(cartItems)) //  Local storage?
        
    } catch (error) {
        alert('404')
        
    }
    
}

const removeItem = (_id) => (dispatch, getState) => {
    dispatch({type:REMOVE_ITEM_FROM_CART, payload:_id})

   const {cart:{cartItems}} = getState()
Cookie.set('cartItems', JSON.stringify(cartItems))
}

const signIn = (password, email) => async (dispatch, getState) => {
    
    try{
    dispatch({type:SIGNIN_REQUEST})
    const userData = await axios.post('/api/users/signin',{password, email})
    dispatch({type:SIGNIN_SUCCES, payload:userData.data})

    const {userData:{userInfo}} = getState()
Cookie.set('userInfo', JSON.stringify(userInfo))
}
catch(err){
    dispatch({type:SIGNIN_FAILED, payload:err.message})

}}

const signOut = () => (dispatch) => {
dispatch({type:SIGN_OUT}) 
Cookie.remove('userInfo')
}


const register = (name, password, email) => async (dispatch, getState) => {
    
    try{
    dispatch({type:SIGNIN_REQUEST})
    const userData = await axios.post('/api/users/register',{name, password, email})
    dispatch({type:SIGNIN_SUCCES, payload:userData.data})

    const {userData:{userInfo}} = getState()
    Cookie.set('userInfo', JSON.stringify(userInfo))
}
catch(err){
    dispatch({type:SIGNIN_FAILED})

}}

const addProduct = (product) => async (dispatch, getState) =>{
    try{
    dispatch({type: PRODUCT_SAVE_REQEST})
    const {userData:{userInfo}}=getState() // userdata:userdata ????
    if(!product._id){
    const newProduct = await axios.post('/api/products/', product, {headers:{Authorization:`bearer ${userInfo.token}`}})
    dispatch({type: PRODUCT_SAVE_SUCCES, payload:newProduct.data})}
    else{
        const updatedProduct = await axios.put(`/api/products/${product._id}`, product, {headers:{Authorization:`bearer ${userInfo.token}`}})
        dispatch({type: PRODUCT_SAVE_SUCCES, payload:updatedProduct.data})
    }
    }
    catch(error){
        dispatch({type:PRODUCT_SAVE_ERROR, payload:error.message})
    }
}


const deleteProduct = (product) => async (dispatch, getState) =>{
    try{
    dispatch({type: PRODUCT_DELETE_REQEST})
    const {userData:{userInfo}}=getState() 
    const deletedProduct = await axios.delete(`/api/products/${product._id}`, {headers:{Authorization:`bearer ${userInfo.token}`}})
    dispatch({type: PRODUCT_DELETE_SUCCES, payload:deletedProduct.data})
    }
    catch(error){
        dispatch({type:PRODUCT_DELETE_ERROR, payload:error.message})
    }
}

const saveShipping = (data) => async (dispatch) =>{
    dispatch({type: CART_SHIPPING, payload:data})
    
}

const savePayment = (data) => async (dispatch) =>{
    dispatch({type: CART_PAYMENT, payload:data})
}

const createOrder = (order) => async (dispatch, getState) =>{
    try{
    dispatch({type: ORDER_SAVE_REQUEST})
    const {userData:{userInfo}}=getState() 
    const {data} = await axios.post(`/api/orders`,order, {headers:{Authorization:`bearer ${userInfo.token}`}})
    dispatch({type: ORDER_SAVE_SUCCES, payload:data.data})
    dispatch({type: CART_EMPTY})
    Cookie.remove('cartItems')

}

catch(error){
    dispatch({type: ORDER_SAVE_ERROR, payload:error.message})

}}

const getOrder = (_id) => async (dispatch) => {
    try{
        dispatch({type:ORDER_DETAILS_REQUEST})
        const {data} = await axios.get(`api/orders/${_id}`)
        dispatch({type:ORDER_DETAILS_SUCCES, payload:data})
    }
    catch(error){
        dispatch({type:ORDER_DETAILS_ERROR, payload:error.message})
    }

}

const payOrder = (_id) => async (dispatch, getState) => {
    try{
        dispatch({type:ORDER_PAY_REQUEST})
        const {userData:{userInfo}}=getState() 
        const {data} = await axios.put(`api/orders/pay/${_id}`,{}, {headers:{Authorization:`bearer ${userInfo.token}`}})
        dispatch({type:ORDER_PAY_SUCCES, payload:data})
    }
    catch(error){
        dispatch({type:ORDER_PAY_ERROR, payload:error.message})
    }

}

const deliverOrder = (_id) => async (dispatch, getState) => {
    try{
        dispatch({type:ORDER_DELIVER_REQUEST})
        const {userData:{userInfo}}=getState() 
        const {data} = await axios.put(`api/orders/deliver/${_id}`,{}, {headers:{Authorization:`bearer ${userInfo.token}`}})
        dispatch({type:ORDER_DELIVER_SUCCES, payload:data})
    }
    catch(error){
        dispatch({type:ORDER_DELIVER_ERROR, payload:error.message})
    }

}

const getMyOrders = () => async (dispatch, getState) => {
    try{
        dispatch({type:MYORDERS_REQUEST})
        const {userData:{userInfo}}=getState() 
        const {data} = await axios.get(`/api/orders/mine`,{headers:{Authorization:`bearer ${userInfo.token}`}})
        dispatch({type:MYORDERS_SUCCES, payload:data})
    }
    catch(error){
        dispatch({type:MYORDERS_ERROR, payload:error.message})
    }

}

const listOrders = () => async (dispatch, getState) => {
    try{
        dispatch({type:LIST_ORDERS_REQUEST})
        const {userData:{userInfo}}=getState() 
        const {data} = await axios.get(`/api/orders/all`,{headers:{Authorization:`bearer ${userInfo.token}`}})
        dispatch({type:LIST_ORDERS_SUCCES, payload:data})
    }
    catch(error){
        dispatch({type:LIST_ORDERS_ERROR, payload:error.message})
    }

}

 export{deliverOrder,getRequest, getRequestItem, addItem, removeItem, signIn, register, addProduct, deleteProduct, saveShipping, savePayment, createOrder,
     getOrder, payOrder, getMyOrders, signOut, listOrders}