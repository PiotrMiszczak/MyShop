import {PRODUCT_LIST_REQEST, PRODUCT_LIST_ERROR, PRODUCT_LIST_SUCCES} from '../actions/actions'

function productListReducer(state = {data:[]}, action){
    switch(action.type){
        case PRODUCT_LIST_REQEST:
        return(
            {loading: true}
        )
        case PRODUCT_LIST_SUCCES:
        return(
            {loading:false, data:action.payload}
        )
        case PRODUCT_LIST_ERROR:
        return(
            {loading:false, data:null, error:true}
        )
        default:
            return state;
    }
}


export default productListReducer