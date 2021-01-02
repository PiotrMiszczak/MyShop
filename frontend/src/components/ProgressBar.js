import React from "react"

function ProgressBar(props){
    return(
        <div className="progress-wrapper">
        <div >
            <p className={props.step1 && ' progress-active-text'}>Sign in</p>
            <div className={props.step1 ? 'progress progress-active' : 'progress'}></div>
        </div>
        <div >
            <p className={props.step2 && ' progress-active-text'}>Shipping</p>
            <div className={props.step2 ? 'progress progress-active' : 'progress'}></div>
        </div>
        <div >
            <p className={props.step3 && ' progress-active-text'}>Payment</p>
            <div className={props.step3 ? 'progress progress-active' : 'progress'}></div>
        </div>
        <div>
            <p className={props.step4 && ' progress-active-text'}>Summary</p>
            <div className={props.step4 ? 'progress progress-active' : 'progress'}></div>
        </div>
        </div>
        
    )
}

export default ProgressBar;