import React, { useState } from 'react'
import '../App.css'
import { useHistory } from "react-router";
import { baseUrl } from '../component/constant';
import Button from 'react-bootstrap-button-loader';
import axios from 'axios'

const Register = ()=>{

    const history = useHistory();
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onBack = ()=>{
        history.push('/')
    }

    const onSubmit = (e)=>{

        e.preventDefault()

        if(username.trim() === ''){
            setError('username can not be empty')
            return
        }
        if(password.trim().length < 6){
            setError('passoword must not be less than 6 characters')
            return
        } 

        setLoading(true)

        let data = {
            username: username,
            password: password
        }
       
        axios.post(`${baseUrl}admin/save`, data)
        .then(res =>{
            console.log(res)
            localStorage.setItem('id', username)
            if(res.status > 200){
                setError('username already exist')
                setLoading(false)
                
                return
            }
            else{
                setLoading(false)
                history.push('/home')
            }
        })
        .then(data => console.log(data))
        .catch(err => setLoading(false))
        
    }

    return(
        <>
        <div className='logindiv'>
            {/* <h2 className='into'>Register</h2> */}
            <div className='loginform'><br/>
                <p className='ad'>Register</p>
                <div className='wrap'>
                <p className='user'>Username:</p>
                <input type='text'  className='usertext' onChange={(e)=>{
                    setUsername(e.target.value)
                }} />
                </div><br/>

                <div className='wrap'>
                <p className='user'>Password:</p>
                <input className='usertext' type='password' onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
                </div>
                <Button className='submitt' loading={loading} onClick={onSubmit}>Sign Up</Button><br/>
                <p style={{color: 'red', textAlign: 'center'}}>{error} <br/>
                    Already have an account? <a style={{color: 'blue', cursor: 'pointer'}} onClick={onBack}>Login</a></p>
            </div>
        </div>
        </>
    )
}

export default Register;