import React, { useEffect, useState } from 'react'
import Footer from '../component/footer'
import Header from '../component/header'
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from 'axios';
import { baseUrl } from '../component/constant';
import { useParams } from 'react-router';
import dayjs from 'dayjs'

const ViewIncome = ()=>{

    const history = useHistory();
    const {id} = useParams()
    const [income, setIncome] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        getIncome()
    }, [])

    const getIncome = ()=>{

        axios.get(`${baseUrl}income/findone/${id}`)
        .then(res =>{
            setIncome(res.data)
            setLoading(false)
        })
        .catch(err => setLoading(false))
    }

    const onBack = ()=>{
        history.push('/home')
    }

    return(
        <>
        <Header/><br/><br/>
        {loading ? 
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 80}}>
            <Loader
             type="Circles"
             color="gray"
             height={70}
             width={70}
            />
        </div> :
         <div className='bodi'>
         <h5 className='detail'>Details</h5>

         <div className='viewme'>
             <table className='viewtable'>
                 <tr>
                     <td className='view1'>Date</td>
                     <td className='view2'>{dayjs(income.datee).format('YYYY-MM-DD HH:mm')}</td>
                 </tr>
                 <tr>
                     <td className='view1'>Title</td>
                     <td className='view2'>{income.title}</td>
                 </tr>
                 <tr>
                     <td className='view1'>Description</td>
                     <td className='view2'>{income.description}</td>
                 </tr>
                 <tr>
                     <td className='view1'>Category</td>
                     <td className='view2'>{income.category}</td>
                 </tr>
                 <tr>
                     <td className='view1'>Amount</td>
                     <td className='view2'>{income.amount}</td>
                 </tr>
                 <tr>
                     <td className='view1'>Method of Payemt</td>
                     <td className='view2'>{income.paidby}</td>
                 </tr>
                 <tr>
                     <td className='view1'>Client Name</td>
                     <td className='view2'>{income.clientname}</td>
                 </tr>
                 
             </table><br/>
             <button className='back' onClick={onBack}>Back</button>
         </div>
     </div>
        }
       

        <Footer/>
        </>
    )

}
export default ViewIncome;