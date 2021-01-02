import {PRODUCT_ITEM_REQEST, PRODUCT_ITEM_ERROR, PRODUCT_ITEM_SUCCES} from '../actions/actions'


function productItemReducer(state = {data:[]}, action){
    switch(action.type){
        case PRODUCT_ITEM_REQEST:
        return(
            {loading: true}
        )
        case PRODUCT_ITEM_SUCCES:
        return(
            {loading:false, data:action.payload}
        )
        case PRODUCT_ITEM_ERROR:
        return(
            {loading:false, data:null, error:true}
        )
        default:
            return state;
    }
}

export default productItemReducer