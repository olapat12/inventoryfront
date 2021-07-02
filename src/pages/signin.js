import React from 'react'
import logo from '../folder/logo.jpg'
import { BsFillEyeFill } from 'react-icons/bs';
import { useState } from 'react';
import validator from 'validator';
import { useHistory } from "react-router";

//BsFillEyeFill

const Signin = ()=>{

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [col, setCol] = useState('')
    const [show, setShow] = useState('block')

    const onSubmit = (e)=>{

        e.preventDefault();
        console.log(username, password)

        if(!validator.isEmail(username)){
            setError('wrong email format')
            setCol('red')
            return
        }
         if(username.trim() !== 'olajide@gmail.com'){
             setError('incorrect email address')
             setCol('red')
             return
         }
         if(password.trim().length < 6){
             setError('password must not be less than 6 characters')
             setCol('red')
             return
         }
         if(password.trim() !== 'okayokay'){
            setError('Incorrect password')
            setCol('red')
            return
         }

         setShow('none')
         setError('success')
         setCol('green')

    }

    return(
        <div className='signin'>
            <div className='first'>
            <img src={logo} alt='logo' className='imglogoo' /><br/>
            <h3 className='wel' style={{color: 'white'}}>Welcome</h3>
            <p className='wel' style={{color: 'white'}}>Sign in to continue</p>
            </div>

            <div className='second'><br/>
                <div className='secc'>
                <p style={{color: 'rgb(4, 66, 56)', fontSize: 19}}>Email address</p>
                <input type='email' className='inp'  onChange={(e)=>{
                    setUsername(e.target.value)
                }} />
                </div>

                <div className='secc'>
                <p className='ppp' style={{color: 'rgb(4, 66, 56)', fontSize: 19}}>Password</p>
                <div className='wrop'>
                    <input 
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }} type='password' style={{width: '90%', height: '95%', border: 'none',
                     outline: 'none', marginLeft:5, color: 'rgb(4, 66, 56)', fontSize: 17}} />
                    <BsFillEyeFill color='rgb(4, 66, 56)' /> 
                </div>
                </div><br/>
                <input className='song' type='submit' style={{display: show}} value='Login' onClick={onSubmit} />
                    <span style={{paddingTop: 7, fontSize: 18, color: col}}>{error}</span>
                <div className='mypass'>
                    <a>Signup</a>
                    <a style={{float: 'right'}}>Forgot Password?</a>
                </div>
            </div>
        </div>
    )
}

export default Signin