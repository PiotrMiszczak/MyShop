import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom'
import StarRating from '../components/StarRating'
import { faCoins, faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useSelector, useDispatch} from 'react-redux';
import { getRequestItem } from '../actions/actions'


function Product(props){
    const {_id} = useParams()
    const [qty, setQty] = useState(1)
    const product = useSelector(state => state.product)
    const {data, loading, error} = product;
    const dispatch = useDispatch();
    
    




    const stock = true; // TEMPORARY
    useEffect(()=>{

        dispatch(getRequestItem(_id))
        
    }
        
        
        ,[])

        let content = null;
       
       
        if(loading){
            content = <div className="loader"></div>
        }
        if(error){
            content = <h1>ERROR occured, check your internet</h1>
        }
        if(data){
            content = 
            <main className="main">
            <div className="product__page">
            <div className="product__page-info">
            <img className="product__page-image" alt='product image' src={data.avatar}></img>
            <div className="product__page-description">
                <h1>{data.name}</h1>
            <p><StarRating /></p> 
<p><FontAwesomeIcon icon={faCoins} /> {data.price} $</p>
<p>Description:</p>
<p>{data.description}</p>
            </div>
            </div>
            <div className="product__actions-wrapper">
            <div className="product__actions">
        
        <p>State: {data.qty<1 ? 'Out of stock' : 'In stock'}</p>
        
        <label htmlFor="qty">Quantity:</label>
        
        <select style={{'margin-left':'1rem'}} name="qty" id="qty" value={qty} onChange={(e)=>setQty(e.target.value)}>
            {Array(data.qty>10 ? 10 : data.qty).fill(null).map((x, index) => {
                return <option key={index+1} value={index+1}>{index+1}</option>
            })}
        </select>
       
        <Link className="Link" to={`/cart/${_id}?qty=${qty}`}><button disabled={data.qty>0 ? false : true} className="product__actions-button"><FontAwesomeIcon icon={faPlusCircle} /> {data.qty>0 ? 'Add to cart' : 'Out of stock'}</button></Link>
        
        </div>
        </div>
            </div>
            </main>
        }
        
        
        return(
           <div >
      {content}
      </div>
        )
    }

export default Product;