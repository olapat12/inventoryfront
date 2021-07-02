import React, {useEffect, useState} from 'react'
import Header from '../component/header'
import Footer from '../component/footer';
import { useHistory } from "react-router";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from 'axios';
import { baseUrl } from '../component/constant';
import { useParams } from 'react-router';
import Loader from "react-loader-spinner";
import Button from 'react-bootstrap-button-loader';
import dayjs from 'dayjs'

const EditIncome = ()=>{

    const history = useHistory();
    const {id} = useParams()
    const [income, setIncome] = useState({})
    const [loading, setLoading] = useState(true)
    const [load, setLoad] = useState(false)
    const [outcome, setOutcome] = useState('')
    const [col, setCol] = useState('')
    const [datee, setDatee] = useState('')
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState()
    const [paidby, setPaidby] = useState()
    const [clientname, setClientname] = useState('')
    const [desc, setDesc] = useState('')

    useEffect(()=>{
        axios.get(`${baseUrl}admin/admin/${localStorage.getItem("id")}`)
        .then(res =>{
            if(res.status !== 200){
                history.push("/")
                return
            }
            // setLoad(false)
        })
        .catch(err => history.push("/"))
        getIncome()
    }, [])

    const getIncome = ()=>{

        axios.get(`${baseUrl}income/findone/${id}`)
        .then(res =>{
            // setIncome(res.data)
            setAmount(res.data.amount)
            setCategory(res.data.category)
            setClientname(res.data.clientname)
            setDesc(res.data.description)
            setDatee(res.data.datee)
            setPaidby(res.data.paidby)
            setTitle(res.data.title)
            setLoading(false)
        })
        .catch(err => setLoading(false))
    }

    const onSubmit = (e)=>{

        e.preventDefault()
        if(title.trim() === '' || desc.trim() === '' || amount.trim() == '' || clientname.trim() ==='' || category.trim() === '' || paidby.trim() === ''){
            setOutcome('Make sure you fill all the fields')
            setCol('red')
            return
        }

        setLoad(true)

        let data = {
        datee: datee,
        category: category,
        description: desc,
        amount: amount,
        title: title,
        paidby: paidby,
        clientname: clientname,
        }
        let status;
        axios.put(`${baseUrl}income/update/${id}`, data)
        .then(res =>{
            status = res.status
            setLoad(false)
        })
        .then(()=>{
            if(status === 200){
                setOutcome('Details successfully updated')
                setCol('green')
                setTimeout(() => {
                    setOutcome('')
                }, 4000);
            }
            else{
                setOutcome('Something went wrong')
                setCol('red')
            }
        })
        .catch(err => setLoad(false))
    }

    return(
        <div>
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

<div className='bodyyy'>
<h3 style={{color: 'white', textDecoration: 'underline'}}>Edit Income</h3>
<div className='inform'><br/>
   <div className='names'><br/><br/>
       <h5 style={{marginBottom: 29}}>Date :</h5>
       <h5 style={{marginBottom: 29}}>Title :</h5>
       <h5 style={{marginBottom: 29}}>Category :</h5>
       <h5 style={{marginBottom: 29}}>Description :</h5>
       <h5 style={{marginBottom: 29}}>Amount :</h5>
       <h5 style={{marginBottom: 29}}>Paid by :</h5>
       <h5 style={{marginBottom: 29}}>Client Name :</h5>
   </div>
   
   <div className='inputss'><br/><br/>
   <span className='showingg'>Date</span>
   <input type='date' className='usertext' style={{marginBottom: 17}} value={dayjs(datee).format('YYYY-MM-DD HH:mm')}
        onChange={(e)=>{
            setDatee(e.target.value)
        }}
   />
   <span className='showingg'>Title</span>
   <input type='text' className='usertext' style={{marginBottom: 17}} value={title}
    onChange={(e)=>{
        setTitle(e.target.value)
    }}
   />
   <span className='showingg'>Category</span>
   <input type='text' className='usertext' style={{marginBottom: 17}} value={category}
    onChange={(e)=>{
        setCategory(e.target.value)
    }}
   />
    <span className='showingg'>Description</span>
   <input type='text' className='usertext' style={{marginBottom: 17}} value={desc}   
    onChange={(e)=>{
        setDesc(e.target.value)
    }}
   />
   <span className='showingg'>Amount</span>
   <input type='text' className='usertext' style={{marginBottom: 17}} value={amount} 
    onChange={(e)=>{
        setAmount(e.target.value)
    }}
   />
   <span className='showingg'>Method of Payment</span>
   <select className='usertext' style={{marginBottom: 17}} value={paidby} 
   onChange={(e)=>{
       setPaidby(e.target.value)
   }}
   >
       <option value='card'>Card</option>
       <option value='cash'>Cash</option>
       <option value='transfer'>Transfer</option>
   </select>

   <span className='showingg'>Client Name:</span>
   <input type='text' className='usertext' id='horn' value={clientname} />
  <span style={{color: col, fontSize: 17}}> {outcome}</span>
   </div>
</div>
<Button className='submiter' loading={load} onClick={onSubmit}>Update</Button>
</div>
           }
            
            {/* <Footer/> */}
        </div>
    )
}

export default EditIncome;