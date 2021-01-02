import {PRODUCT_DELETE_ERROR, PRODUCT_DELETE_REQEST, PRODUCT_DELETE_SUCCES} from '../actions/actions'


function deleteProductReducer(state={}, action){
    switch(action.type){
        case PRODUCT_DELETE_REQEST:
            return (
                {loading:true}
            )
        case PRODUCT_DELETE_SUCCES:
        return(
            {loading:false, data:action.payload, success:true}
        )
        case PRODUCT_DELETE_ERROR:
        return(
            {loading:false, data:null, error:action.payload}
        )
        default:
        return state

    }
}

export default deleteProductReducer;