import React from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {Link} from 'react-router-dom'



class Navbar extends React.Component{

    state={
        isOpen: false,
        user: undefined,
        isLoadig: true,
        check: true
        // openn: ''
    }

    handleToggle = ()=>{
        this.setState({isOpen:!this.state.isOpen})
    }
   

    render(){
       
        return(
            <div className='navbar'>
                
                    <div className='nav-header'>
                    
                        <Link to='/' className='brand'>
                            Brand
                        </Link>

                        <span className='nove'>
                        <button className='uzo' href='/galaxy'>Home</button>
                        <button className='uzo'>About</button>
                         <button className='uzo'>Services</button>
                          <button className='uzo'>Gallery</button>
                        <button className='uzo'>Feedback</button> 
                        </span>
                        
                        <p style={{float: 'right'}}>
                        <button className='nav-btn' onClick={this.handleToggle}>
                            <GiHamburgerMenu className='nav-icon' color="white" />
                        </button>
                        </p>
                    </div>
                    <ul className={this.state.isOpen?"nav-links show-nav":"nav-links"}>
                    <div className='uzi'>
         <button className='uzo' href='/galaxy'>Home</button>
         <button className='uzo'>About</button>
         <button className='uzo'>Services</button>
         <button className='uzo'>Gallery</button>
         <button className='uzo'>Feedback</button>
        </div>
                    </ul>
                </div>
            
        )
   
}
}

export default Navbar