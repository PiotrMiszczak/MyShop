import {ADD_ITEM_TO_CART, CART_SHIPPING, REMOVE_ITEM_FROM_CART, CART_PAYMENT, CART_EMPTY} from '../actions/actions'



function cartReducer(state = {cartItems:[]}, action){
    switch(action.type){
        case ADD_ITEM_TO_CART:
            let repeat = false;
            const itemToAdd = action.payload;
state.cartItems.forEach(item => {
    if (item._id == itemToAdd._id){
        repeat = true;
    }
})
if(repeat==false){
    return(
        {cartItems: [...state.cartItems, itemToAdd]}
    )

}
else{
    return(
        {cartItems: state.cartItems.map(item=> item._id==itemToAdd._id ? itemToAdd : item )}
    )
}
case REMOVE_ITEM_FROM_CART:
    return(
        {cartItems: state.cartItems.filter(item => item._id!=action.payload)}
    )
case CART_SHIPPING:
        return(
            {...state, shipping:action.payload}
        )
case CART_PAYMENT:
        return(
            {...state, payment:action.payload}
        )    
case CART_EMPTY:
        return(
            {...state, cartItems:[]}
        )       
            
           
                
       
        
        default:
            return state;
    }
}

export default cartReducer



