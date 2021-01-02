import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import  {register} from '../actions/actions';
import {useHistory, Link} from 'react-router-dom'


function Register(){

    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [rePassword, setRePassword] = useState('')
    const dispatch = useDispatch()
    const {userInfo, loading, error} = useSelector(state=>state.userData)
    let params = new URLSearchParams(document.location.search);
    const redirect=params.get('redirect')
    let history = useHistory();
    let passInvalid = null;
    
    useEffect(()=>{ 
        if(userInfo){
            if(redirect){
                history.push(`/${redirect}`)
            }
            else{
                history.push('/')

            }
           
        }}
    ,[userInfo])
    function handleRegister(e){
        e.preventDefault();
        password!==rePassword ? alert('Password does not match, correct and try again') : dispatch(register(name,password,email))

        
    }

    return(
        <div className="main">
        <div className="form__wrapper">
            <h1>Welcome to MyShop!</h1>
            {passInvalid}
            <form onSubmit={handleRegister} className="form">
            <label for="name">Name: </label>
                <input required type="text" id="name" name="name" onChange={(e)=>setName(e.target.value)}></input>
                <label for="email">E-mail: </label>
                <input required type="email" id="email" name="email" onChange={(e)=>setEmail(e.target.value)}></input>
                <label for="password">Password: </label>
                <input required type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)}></input>
                <label for="repassword">Retype password: </label>
                <input required type="password" id="repassword" name="repassword" onChange={(e)=>setRePassword(e.target.value)}></input>
                
                <button className="button-secondary"type="submit">Register</button>
                <h2>Already have an account? Click below:</h2>
                <Link className="Link" to={'/signin'}>
                <button className="button-secondary">Sign in</button>
                </Link>


            </form>

            </div>
        </div>
        
    
    )
}

export default Register;