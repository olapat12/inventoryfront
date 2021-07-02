import React from 'react'
import { useEffect } from 'react'
import logo from '../folder/logo.jpg'
import { useHistory } from "react-router";

const TextPage = ()=>{

    const history = useHistory();

    useEffect(()=>{
         setTimeout(() => {
             history.push('/signin')
         }, 4000);
    })

    return(
        <div className='text'>
            <div className='cluv'>
            <img src={logo} alt='logo' className='imglogo' /><br/>
            <h4 className='club'>Clover Club</h4>
            </div>
        </div>
    )
}
export default TextPage;