import React from 'react';
import Navigation from './Navigation';
import {Link} from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Header(){
    return(
        <header className="header">
            
     <Link to="/"><FontAwesomeIcon className="returnHome" icon={faHome} /></Link>
     <h1>My Shop</h1>
      < Navigation/>
    </header>
    )
}

export default Header;