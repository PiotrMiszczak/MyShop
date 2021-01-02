import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {savePayment} from '../actions/actions'
import ProgressBar from '../components/ProgressBar'



function ShippingPage(props){

  
    const [payment, setPayment] = useState('')
    const dispatch = useDispatch()
    let history = useHistory();
  
  

    function handlePayment(e){
        e.preventDefault();
        dispatch(savePayment(payment))     
        history.push('/summary')   
    }

    return(
        <main className="main">
        <ProgressBar step1 step2 step3/>
        <div className="form__wrapper">
            <h1>Payment method</h1>
            <form onSubmit={handlePayment} className="form">
                <div className="payment__input">
           <input style={{height:'1rem'}} type="radio" name="payment" id="payment" value="paypal" onChange = {(e)=>{setPayment(e.target.value)}}></input>
           <label style={{display:'inline'}} for="payment">Paypal</label>
           </div>

                
                <button className="button-secondary" type="submit">Next</button>



            </form>


        </div>
        </main>
        
    
    )
}

export default ShippingPage;