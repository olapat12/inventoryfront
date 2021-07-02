import React, {useEffect, useState} from 'react'
import Header from '../component/header'
// import Footer from '../component/footer';
import axios from 'axios'
import { baseUrl } from '../component/constant';
import Button from 'react-bootstrap-button-loader';
import { useHistory } from "react-router";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const ExpensesForm = ()=>{

    const [datee, setDatee] = useState()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [amount, setAmount] = useState(0)
    const [vendor, setVendor] = useState('')
    const [category, setCategory] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [col, setCol] = useState('')
    const [load, setLoad] = useState(true)
    const history = useHistory();


    useEffect(()=>{

        axios.get(`${baseUrl}admin/admin/${localStorage.getItem("id")}`)
        .then(res =>{
            if(res.status !== 200){
                history.push("/")
                return
            }
            setLoad(false)
        })
        .catch(err => history.push("/"))
    })

    const onSubmit = (e) =>{

        e.preventDefault()


        if(title.trim() === '' || desc.trim() === '' || amount.trim() == '' || vendor.trim() ==='' || category.trim() === ''){
            setError('Make sure you fill all the fields')
            setCol('red')
            setLoading(false)
            return
        }
        setLoading(true)

        let data = {
            title: title,
            datee: datee,
            description: desc,
            category: category,
            vendor: vendor,
            amount: amount
        }
        let status;
        axios.post(`${baseUrl}expenses/add`, data)
        .then(res =>{
            status = res.status;
            setLoading(false)
        })
        .then(()=>{
            if(status === 200){
                setError('Expenses successfully added')
                setCol('green')
                setTitle('')
                setVendor('')
                setCategory('')
                setDesc('')
                setAmount('')
                setDatee('')
            }
            else{
                setError('something went wrong')
                setCol('red')
            }
        }).catch(err => setLoading(false))
    }

    return(
        <div>
            {load ? 
                 <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 80}}>
                 <Loader
                  type="Circles"
                  color="gray"
                  height={70}
                  width={70}
                 />
             </div> :
<>
<Header/><br/><br/>
<div className='bodyyy'>
    <h3 style={{color: 'white', textDecoration: 'underline'}}>Add New Expenses</h3>
    <div className='informm'>
       <div className='names'><br/><br/>
           <h5 style={{marginBottom: 29}}>Date :</h5>
           <h5 style={{marginBottom: 29}}>Title :</h5>
           <h5 style={{marginBottom: 29}}>Category :</h5>
           <h5 style={{marginBottom: 29}}>Description :</h5>
           <h5 style={{marginBottom: 29}}>Amount :</h5>
           <h5 style={{marginBottom: 29}}>Vendor:</h5>
       </div>
       
       
       <div className='inputss'><br/><br/>
       <span className='showingg'>Date</span>
       <input type='date' className='usertext' value={datee} style={{marginBottom: 17}}
        onChange={(e)=>{
            setDatee(e.target.value)
        }}
       />
       <span className='showingg'>Title</span>
       <input type='text' className='usertext' value={title} style={{marginBottom: 17}}
        onChange={(e)=>{
            setTitle(e.target.value)
        }}
       />
       <span className='showingg'>Category</span>
       <input type='text' className='usertext' value={category} style={{marginBottom: 17}}
        onChange={(e)=>{
            setCategory(e.target.value)
        }}
       />
       <span className='showingg'>Description</span>
       <input type='text' className='usertext' value={desc} style={{marginBottom: 17}} 
        onChange={(e)=>{
            setDesc(e.target.value)
        }}
       />
       <span className='showingg'>Amount</span>
       <input type='text' className='usertext' value={amount} style={{marginBottom: 17}} 
        onChange={(e)=>{
            setAmount(e.target.value)
        }}
       />
       <span className='showingg'>Vendor</span>
       <input type='text' className='usertext' value={vendor} id='horn' style={{marginBottom: 17}}
        onChange={(e)=>{
            setVendor(e.target.value)
        }}
       />
       <span style={{color: col, fontSize: 17}}> {error}</span>
       </div><br/>
      
    </div>
    <Button className='submiter' loading={loading} onClick={onSubmit}>Submit</Button>
</div></>
            }
            
            
        </div>
    )
}

export default ExpensesForm;