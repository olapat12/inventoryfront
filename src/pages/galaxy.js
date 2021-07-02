import React from 'react'
import '../galaxy.css'
import { Nav} from 'react-bootstrap'
import Navbar from '../component/navv'


const Galaxy = ()=>{

    return(
        <div className='gal'>
            <Navbar />
             {/* <Navbar expand="lg" fixed="top">
         <a href='/galaxy' className='brand'>Brand</a> 
             <Navbar.Toggle aria-controls="basic-navbar-nav" variant="light" />
             <Navbar.Collapse id="basic-navbar-nav">
             <Nav className="mr-auto">
              
            </Nav><br/>
          <div className='uzi'>
         <button className='uzo' href='/galaxy'>Home</button>
         <button className='uzo'>About</button>
         <button className='uzo'>Services</button>
         <button className='uzo'>Gallery</button>
         <button className='uzo'>Feedback</button>
        </div>
       </Navbar.Collapse>
      </Navbar> */}
      <br/><br/><br/>
           <div className='myown'>
            <h3 className='res'>Responsive Navigation Design</h3>
            <p>
            A long essay is any essay that tends to be longer than three pages or 3,000 words or more. Of course, 
            the definition of a long essay will differ from one classroom to another, depending on the age and level of the students. And even if you're a college student, 
            you may have some professors who consider a five-page essay to be the average, while another teacher considers five pages to be too much. Therefore, it's important to check with your teacher,
             though they'll usually clarify this when giving the assignment.
             Sometimes, the term "long" applies to how many pages, and sometimes it applies to how many paragraphs or words need to be in the essay. Again, this all depends on your teacher, your school's requirements and the nature of the assignment. Either way, hearing your teacher say that you must write a long essay for your next assignment can certainly cause a lot of stress. The good news is that writing a long essay can be much easier than writing a short essay, especially if you're given some meaningful advice.
            </p>
           </div> 
        </div>
    )
}

export default Galaxy;