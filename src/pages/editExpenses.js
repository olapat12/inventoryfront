import React, {useState, useEffect} from 'react'
import Header from '../component/header'
import Footer from '../component/footer';
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from 'axios';
import { baseUrl } from '../component/constant';
import { useParams } from 'react-router';
import dayjs from 'dayjs'
import Button from 'react-bootstrap-button-loader';

const EditExpenses = ()=>{

    const history = useHistory();
    const {id} = useParams()
    const [expenses, setExpenses] = useState({})
    const [loading, setLoading] = useState(true)
    const [load, setLoad] = useState(false)
    const [outcome, setOutcome] = useState('')
    const [col, setCol] = useState('')
    const [datee, setDatee] = useState()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [amount, setAmount] = useState(0)
    const [vendor, setVendor] = useState('')
    const [category, setCategory] = useState('')

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
        getExpenses()
    }, [])

    const getExpenses = ()=>{

        axios.get(`${baseUrl}expenses/findone/${id}`)
        .then(res =>{
            setExpenses(res.data)
                setTitle(res.data.title)
                setVendor(res.data.vendor)
                setCategory(res.data.category)
                setDesc(res.data.description)
                setAmount(res.data.amount)
                setDatee(res.data.datee)
            setLoading(false)
        })
        .catch(err => setLoading(false))
    }

    const onSubmit = (e)=>{

        e.preventDefault()

        if(title.trim() === '' || desc.trim() === '' || amount.trim() == '' || vendor.trim() ==='' || category.trim() === ''){
            setOutcome('Make sure you fill all the fields')
            setCol('red')
            return
        }
        setLoad(true)
        let status;
        let data = {
            title: title,
            datee: datee,
            description: desc,
            category: category,
            vendor: vendor,
            amount: amount
        }
        axios.put(`${baseUrl}expenses/update/${id}`, data)
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
<h3 style={{color: 'white', textDecoration: 'underline'}}>Edit Expenses</h3>
<div className='informm'><br/>
   <div className='names'><br/>
       <h5 style={{marginBottom: 29}}>Date :</h5>
       <h5 style={{marginBottom: 29}}>Title :</h5>
       <h5 style={{marginBottom: 29}}>Category :</h5>
       <h5 style={{marginBottom: 29}}>Description :</h5>
       <h5 style={{marginBottom: 29}}>Amount :</h5>
       <h5 style={{marginBottom: 29}}>Vendor:</h5>
   </div>
   
   <div className='inputss'><br/>
   <span className='showingg'>Date</span>
   <input type='date' className='usertext' onChange={(e)=>{
       setDatee(e.target.value)
   }}
    style={{marginBottom: 17}} value={dayjs(datee).format('YYYY-MM-DD')} 
    />

    <span className='showingg'>Title</span>
   <input type='text' className='usertext' style={{marginBottom: 17}}  value={title}
   onChange={(e)=>{
      setTitle(e.target.value) 
   }}
   />
   <span className='showingg'>Category</span>
   <input onChange={(e)=>{
       setCategory(e.target.value)
   }}
   type='text' className='usertext' style={{marginBottom: 17}} value={category}
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
   <span className='showingg'>Vendor</span>
   <input type='text' className='usertext' id='horn' style={{marginBottom: 17}} value={vendor}
   onChange={(e)=>{
       setVendor(e.target.value)
   }}
   />
   <span style={{color: col, fontSize: 17}}> {outcome}</span>
   </div><br/>
   
</div>
<Button className='submiter' loading={load} onClick={onSubmit} >Update</Button>
</div>
           }
            
            {/* <Footer/> */}
        </div>
    )
}

export default EditExpenses;