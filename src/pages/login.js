import React, {useState} from 'react'
import '../App.css'
import { useHistory } from "react-router";
import { baseUrl } from '../component/constant';
import Button from 'react-bootstrap-button-loader';
import axios from "axios"


const Login = ()=>{

    const history = useHistory();
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onBack = ()=>{
        history.push('/register')
    }

    const onSubmit = (e)=>{

        e.preventDefault()

        setLoading(true)

        let data = {
            username: username,
            password: password
        }
       
        axios.post(`${baseUrl}admin/login`, data)
        .then(res =>{
            if(res.status === 200){
                localStorage.setItem('id', username)
                history.push("/home")
                return
            }
            else{
                setError('Invalid credentials')
                setLoading(false)
            }
        })
        .catch(err => setLoading(false))
        
    }

    return(
        <>
        <div className='logindiv'>
            <p className='into'>Login into your account</p>
            <div className='loginform'><br/>
                <p className='ad'>Admin Login</p>
                <div className='wrap'>
                <p className='user'>Username:</p>
                <input type='text' className='usertext' onChange={(e)=>{
                    setUsername(e.target.value)
                }} />
                </div><br/>

                <div className='wrap'>
                <p className='user'>Password:</p>
                <input className='usertext' type='password' onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
                </div>
                <Button className='submitt' loading={loading} onClick={onSubmit}>Login</Button>
                <p style={{color: 'red', textAlign: 'center', marginTop: 5}}>{error} <br/>
                    Don't have an account? <a style={{color: 'blue', cursor: 'pointer'}} onClick={onBack} >Register</a></p>
            </div>
        </div>
        </>
    )
}

export default Login;