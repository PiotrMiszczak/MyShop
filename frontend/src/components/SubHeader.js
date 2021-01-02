import React from 'react'
import purchase from '../images/purchase.svg'

function SubHeader(){
    return(
    <div className="subheader">
        <div className="subheader__heading-wrapper">
        <h2>
            <span className="subheader__heading subheader__heading-primary">Get Yourself</span>
            <span className="subheader__heading subheader__heading-secondary">Into Jeans</span>
        </h2>
        <a href='#seeproducts' className="button button-primary">See our products</a>
        </div>
        


    </div>
    )
}

export default SubHeader