import {Link, useHistory} from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listOrders} from "../actions/actions";

function AllOrders(){

const {orders, loading, error} = useSelector(state=>state.listOrders)
const {userInfo} = useSelector(state=>state.userData) 
const dispatch = useDispatch()
const history = useHistory()

if(!userInfo || !userInfo.isAdmin){
    history.push('/')

}

useEffect(()=>{
    dispatch(listOrders())
},[])
    return(
        <main className="main">
            {loading ? <div className="loader"></div> : orders ?
 <table className="admin__table">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Order price</th>
                    <th>Order payment status</th>
                    <th>Order delivery status</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order=>{
                    return(
                        <tr>
                            <td>{order._id}</td>
                            <td>{order.totalPrice}</td>
                            <td>{!order.isPaid ? 'Not paid':`Paid at ${order.paidAt.slice(0,10)}`}</td>
                            <td>{!order.isDelivered ? 'Not delivered':`Delivered at ${order.deliveredAt.slice(0,10)}`}</td>
                            <td><Link to={`/orders/${order._id}`}><button>Details</button></Link></td>
                           
                        </tr>

                    )
                })}
            </tbody>
            </table> : <h1>Looks like you do not have any orders</h1>}
        </main>
    )
}

export default AllOrders