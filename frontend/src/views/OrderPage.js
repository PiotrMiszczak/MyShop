import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { PayPalButton } from 'react-paypal-button-v2';
import { useHistory } from "react-router-dom";

import { getOrder, ORDER_PAY_RESET, payOrder, deliverOrder } from "../actions/actions"; // TODO
import Axios from "axios";

function OrderPage(props) {
  const { userInfo } = useSelector((state) => state.userData);
  const [paypalSdk, setPaypalSdk] = useState({loading:false, loaded:false});
  const { data: order, error, succes, loading } = useSelector(
    (state) => state.orderDetails
  );
  const {error:errorPay, success:succesPay, loading:loadingPay } = useSelector(
    (state) => state.orderPay
  );
  const {error:errorDeliver, success:succesDeliver, loading:loadingDeliver } = useSelector(
    (state) => state.orderDeliver
  );
  const { _id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

function paymentHandler(){
  dispatch(payOrder(_id))
}
function deliveryHandler(){
  dispatch(deliverOrder(_id)) // TODO
}

  if (!userInfo) {
    history.push("/");
  }

useEffect(()=>{
  const addPaypalScript = async () => {
    if(!paypalSdk.loaded && !paypalSdk.loading){
      setPaypalSdk({loaded:false, loading:true})
    const script = document.createElement("script");
    const { data: clientId } = await Axios.get("api/config/paypal");
    console.log(clientId)
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    script.addEventListener("load", () =>
        setPaypalSdk({ loading: false, loaded: true })
      );
    document.body.appendChild(script);
  }};
  addPaypalScript()

},[paypalSdk])

  useEffect(()=>{  
    if(!order || succesPay || succesDeliver || order && order._id!=_id){
      dispatch(getOrder(_id))
      
    }

      
  },[succesPay, succesDeliver]
  )

  const loader = loading ? <div className="loader"></div> : null;
  let content = order ? (
    <main className="main">
      <div className="summary summary-final">
        <div className="summary__info summary__info-final">
          <div className="summary__shipping">
            <h2>Shipping</h2>
            <p>
              {order.shipping.adress},{order.shipping.country}
            </p>
            <div
              className={
                order.isDelivered
                  ? "order-status order-status-green"
                  : "order-status order-status-red"
              }
            >
              {order.isDelivered ? "Delivered" : "Not delivered"}
            </div>
          </div>
          <div className="summary__payment">
            <h2>Payment method</h2>
            <p style={{ "text-transform": "capitalize" }}>
              {order.paymentMethod}
            </p>
            <div
              className={
                order.isPaid
                  ? "order-status order-status-green"
                  : "order-status order-status-red"
              }
            >
              {order.isPaid ? `Paid at ${order.paidAt.slice(0,16).split('T')} UTC` : "Not paid"}
            </div>
          </div>
          <div className="cart__items">
            <h2>Shopping cart</h2>
            {order.orderItems.map((item) => {
              return (
                <div className="cart__item">
                  <img
                    style={{ float: "left", "margin-right": "1rem" }}
                    src={item.avatar}
                  />
                  <h2>{item.name}</h2>
                  <p>Price: {item.price}</p>
                  <p>Quantity: {item.qty}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="summary__actions summary__actions-final">
          <h1>Order summary</h1>

          <p>
            Delivery price:{" "}
            {order.deliveryPrice == 0
              ? "free"
              : order.deliveryPrice + "$(free for orders above 200$)"}
          </p>
          <span>Total: {order.totalPrice}$</span>
          {!order.isPaid ?
          paypalSdk.loading ? 
          <p>...Loading Paypal</p> :
          <div className="paypal-wrapper">
           <PayPalButton onSuccess={paymentHandler} amount={order.totalPrice}></PayPalButton> </div>: null}
           {order.isPaid && !order.isDelivered && userInfo.isAdmin && <button onClick={deliveryHandler} className="summary__button">Deliver order</button>}
        </div>
      </div>
    </main>
  ) : null;
  const errorWarning = error ? <h1>{error}</h1> : null;
  return (
    <div>
      {loader}
      {content}
      {errorWarning}
    </div>
  );
}

export default OrderPage;
