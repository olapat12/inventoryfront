import React, { useState } from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {Link} from 'react-router-dom'
import { useHistory } from "react-router";

const Navbar = ()=>{

    const history = useHistory();

    const [isOpen, setIsopen] = useState(false)
    
    const handleToggle = ()=>{
        setIsopen(!isOpen)
    } 

    const onIncome = ()=>{
        history.push('/home')
    }

    const onExpenses = ()=>{
        history.push('/expenses')
    }

    const onaddExpenses = ()=>{
        history.push('/addexpenses')
    }

    const onaddIncome = ()=>{
        history.push('/addincome')
    }

    const logOut = ()=>{
        localStorage.removeItem('id')
        history.push('/')
    }

        return(
            <div className='navbarr'>
                
                    <div className='nav-headerr'>
                    
                        <Link to='/' className='brand'>
                            Logo
                        </Link>
                        <span className='navme'>
                        <button className='uzoo' onClick={onIncome} >Income</button>
                        <button className='uzoo'onClick={onExpenses} >Expenses</button>
                        <button className='uzoo' onClick={onaddIncome}>New Income</button>
                         <button className='uzoo' onClick={onaddExpenses}>New Expenses</button>
                         <button className='uzoo' onClick={logOut}>Logout</button>
                        </span>
                        <p style={{float: 'right', marginRight: 15}}>
                        <button className='nav-btn' onClick={handleToggle}>
                            <GiHamburgerMenu className='nav-icon' color="white" />
                        </button>
                        </p>
                    </div>
                    <ul className={isOpen ? "nav-links show-navv":"nav-links"}>
                    <div className='uzii'>
                    <button className='uzoo' onClick={onIncome} >Income</button>
                        <button className='uzoo'onClick={onExpenses} >Expenses</button>
                        <button className='uzoo' onClick={onaddIncome}>New Income</button>
                         <button className='uzoo' onClick={onaddExpenses}>New Expenses</button>
                         <button className='uzoo' onClick={logOut}>Logout</button>
        </div>
                    </ul>
                </div>
            
        )
}

export default Navbar