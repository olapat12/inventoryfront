import React, {useState, useEffect} from 'react'
import Footer from '../component/footer'
import Header from '../component/header'
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from 'axios';
import { baseUrl } from '../component/constant';
import { useParams } from 'react-router';
import dayjs from 'dayjs'

const ViewExpenses = ()=>{

    const history = useHistory();
    const {id} = useParams()
    const [expenses, setExpenses] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        getExpenses()
    }, [])

    const getExpenses = ()=>{

        axios.get(`${baseUrl}expenses/findone/${id}`)
        .then(res =>{
            setExpenses(res.data)
            setLoading(false)
        })
        .catch(err => setLoading(false))
    }

    const onBack = ()=>{
        history.push('/expenses')
    }

    return(
        <>
        <Header/>
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
                <td className='view2'>{dayjs(expenses.datee).format('YYYY-MM-DD HH:mm')}</td>
            </tr>
            <tr>
                <td className='view1'>Title</td>
                <td className='view2'>{expenses.title}</td>
            </tr>
            <tr>
                <td className='view1'>Description</td>
                <td className='view2'>{expenses.description}</td>
            </tr>
            <tr>
                <td className='view1'>Category</td>
                <td className='view2'>{expenses.category}</td>
            </tr>
            <tr>
                <td className='view1'>Amount</td>
                <td className='view2'>{expenses.amount}</td>
            </tr>
            
            <tr>
                <td className='view1'>Vendor</td>
                <td className='view2'>{expenses.vendor}</td>
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
export default ViewExpenses;