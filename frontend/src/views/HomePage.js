import React, { useEffect} from 'react';
import ProductCard from '../components/ProductCard'
import SubHeader from '../components/SubHeader'

import {useSelector, useDispatch} from 'react-redux';
import { getRequest } from '../actions/actions'

function HomePage(){

const products = useSelector(state => state.products)
const {userInfo} = useSelector(state => state.userData)
const {data, loading, error} = products;
const dispatch = useDispatch();

useEffect(()=>{
  dispatch(getRequest());
}
    
    ,[])

const productsList = data ? data.map((product)=>{return <ProductCard _id={product._id} key={product._id} price={product.price} name={product.name} image={product.avatar} />}) : null;

    return(
        <main className="main main-home">
       {loading ? <div className="loader"></div> : 
       error ? <h1>Loading failed, check your internet connection and try again</h1> :
       <div>
       <SubHeader />
       <div id="seeproducts" className="main__product-wrapper">{productsList}</div>
       </div>}
      
    
        </main>
    )
}

export default HomePage;