import {SIGNIN_FAILED, SIGNIN_REQUEST, SIGNIN_SUCCES, SIGN_OUT} from '../actions/actions'

function signinReducer(state = {}, action){
    switch(action.type){
        case SIGNIN_REQUEST:
        return(
            {loading: true}
        )
        case SIGNIN_SUCCES:
        return(
            {loading:false,error:false, userInfo:action.payload}
        )
        case SIGNIN_FAILED:
        return(
            {loading:false, userInfo:null, error:true}
        )
        case SIGN_OUT:
            return {}
        default:
            return state;
    }
}


export default signinReducer;