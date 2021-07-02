import React, { useEffect } from 'react'
import Header from '../component/header'
import Footer from '../component/footer';
import Button from 'react-bootstrap-button-loader';
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../component/constant';
import { useHistory } from "react-router";

const IncomeForm = ()=>{

    const [load, setLoad] = useState(false)
    const [datee, setDatee] = useState('')
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState()
    const [paidby, setPaidby] = useState()
    const [clientname, setClientname] = useState('')
    const [desc, setDesc] = useState('')
    const [outcome, setOutcome] = useState('')
    const [col, setCol] = useState('')
    const history = useHistory();

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
    })

    const onSubmit = (e)=>{

        e.preventDefault(e)

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
        axios.post(`${baseUrl}income/add`, data)
        .then(res =>{
            status = res.status
            // console.log(res)
            setLoad(false)
        })
        .then(()=>{
            if(status === 200){
                setOutcome('success')
                setCol('green')
                setTitle('')
                setClientname('')
                setCategory('')
                setDesc('')
                setAmount('')
                setDatee('')
                setPaidby('')
                setTimeout(() => {
                    setOutcome('')
                }, 4000);
            }
            else{
                setOutcome('Something went wrong, try again')
                setCol('red')
            }
        })
        .catch(err => setLoad(false))
    }

    return(
        <div>
            <Header/><br/><br/>
            <div className='bodyyy'>
                <h3 style={{color: 'white', textDecoration: 'underline'}}>Add New Income</h3>
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
                   <input type='date' className='usertext' value={datee} style={{marginBottom: 17}} required={true}
                    onChange={(e)=>{
                        setDatee(e.target.value)
                    }}
                   />
                   <span className='showingg'>Title</span>
                   <input type='text' className='usertext' value={title} style={{marginBottom: 17}} required={true}
                    onChange={(e)=>{
                        setTitle(e.target.value)
                    }}
                   />
                   <span className='showingg'>Category</span>
                   <input type='text' className='usertext' value={category} style={{marginBottom: 17}} required={true} 
                    onChange={(e)=>{
                        setCategory(e.target.value)
                    }}
                   />
                   <span className='showingg'>Description</span>
                   <input type='text' className='usertext' value={desc} style={{marginBottom: 17}} required={true} 
                    onChange={(e)=>{
                        setDesc(e.target.value)
                    }}
                   />
                   <span className='showingg'>Amount</span>
                   <input type='text' className='usertext' value={amount} style={{marginBottom: 17}} required={true} 
                    onChange={(e)=>{
                        setAmount(e.target.value)
                    }}
                   />
                   <span className='showingg'>Method of Payment</span>
                   <select className='usertext' value={paidby} style={{marginBottom: 17}} required={true} 
                    onChange={(e)=>{
                        setPaidby(e.target.value)
                    }}
                   >
                       <option value=''>--Select--</option>
                       <option value='card'>Card</option>
                       <option value='cash'>Cash</option>
                       <option value='transfer'>Transfer</option>
                   </select>
                   <span className='showingg'>Client Name:</span>
                   <input type='text' className='usertext' id='horn' value={clientname} onChange={(e)=>{
                       setClientname(e.target.value)
                   }} />
                   <span style={{color: col, fontSize: 17}}> {outcome}</span>
                   </div>
                </div>
                
                <Button className='submiter' loading={load} onClick={onSubmit}>Submit</Button>
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default IncomeForm;