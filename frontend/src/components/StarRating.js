import React, {useState} from 'react'
import { faStar} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function StarRating(){
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(0);

    return(
    Array(5).fill(null).map((star,index)=>{

        const ratingValue = index+1
        return(
            <label key={index} >
                <input onClick={()=>setRating(ratingValue)} className="rating__input" type="radio"  value={ratingValue}></input>
                <FontAwesomeIcon style={{color:(hover || rating) >= ratingValue ? 'gold' : 'black' }} onMouseEnter={()=>{setHover(ratingValue)}} onMouseLeave={()=>setHover(null)} icon={faStar} />
            </label>
        )
    }))

}

export default StarRating;