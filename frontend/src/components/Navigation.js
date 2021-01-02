import React, {useState, getState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
import { faBars, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useTransition, animated} from 'react-spring';
import {signOut} from '../actions/actions'

function Navigation(){

    const [showMenu, setShowMenu] = useState(false);
   const cart = useSelector(state => state.cart);
const items = cart.cartItems
const dispatch = useDispatch()
const history = useHistory()
const {userInfo} = useSelector(state => state.userData)
    const transitions = useTransition(showMenu, null, {
        from: { transform: 'translateX(100%)' },
        enter: {transform: 'translateX(0%)' },
        leave: {transform: 'translateX(100%)'},
        })
    
   function signOutHandler(){
    setShowMenu(false)
  dispatch(signOut())
  history.push('/')
  

   }

    return(
        <div>

    {userInfo ?
<button className="navigation__button" onClick={()=>setShowMenu(!showMenu)}>
<FontAwesomeIcon icon={faBars} />
    </button>:<Link to={'/signin'}><button className="navigation__button">Sign in</button></Link> }
    <Link to={'/cart'}>
    <button className="navigation__button">
    <FontAwesomeIcon icon={faShoppingCart} />
    {items.length ? <span className="navigation__button-cartitems">{items.length}</span>:null}
    </button>
    </Link>
    { transitions.map(({ item, key, props }) =>
item && <animated.div key={key} style={props} className="navigation__menu">
    <div className="navigation__menu-header">
        <h2>Hello {userInfo && userInfo.name}</h2>
         <button className="navigation__button" onClick={()=>setShowMenu(!showMenu)}>
 <FontAwesomeIcon icon={faTimes} />
</button> 
</div>
<ul>
            <li><Link onClick={()=>setShowMenu(false)} className="navigation__menu-option" to={'/myorders'}>My orders</Link></li>
            {userInfo && userInfo.isAdmin && <li><Link onClick={()=>setShowMenu(false)} className="navigation__menu-option" to={'/products'}>Manage products</Link></li>}
            {userInfo && userInfo.isAdmin && <li><Link onClick={()=>setShowMenu(false)} className="navigation__menu-option" to={'/orders'}>Manage orders</Link></li>}

            <li><span className="navigation__menu-option" onClick={signOutHandler}>Sign out</span></li>
        </ul>
</animated.div>
)}
    </div>
    )
}

export default Navigation;
