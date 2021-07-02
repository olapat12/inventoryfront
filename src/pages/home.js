import React from 'react';
import Footer from '../component/footer';
import Header from '../component/header';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { baseUrl } from '../component/constant';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import dayjs from 'dayjs'
import Paginateee from '../component/incomePagination'
import moment from 'moment'
import { useHistory } from "react-router";

let allIncome = [];

const Home = ()=>{

  const [loading, setLoading] = useState(true)
  const [income, setIncome] = useState([])
  const [active, setActive] = useState(1)
  const [perPage, setPerpage] = useState(5)
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

    getIncome()
  
  }, income)

  const getIncome = ()=>{

    axios.get(`${baseUrl}income/getall`)
    .then(res =>{
      setIncome(res.data)
      allIncome=res.data
      setLoading(false)
    })
    .catch(err => setLoading(false)) 
  }

  const onSearch = (e)=>{
    setIncome(allIncome.filter(i => i.idd === e.target.value || dayjs(i.datee).format('YYYY-MM-DD') === dayjs(e.target.value).format('YYYY-MM-DD')))
  }

  const onFilter = (e)=>{

    const date = new Date();

    var currentDate = moment();
    
    if(e.target.value === 'yearly'){
      setIncome(allIncome)
    }
    else if(e.target.value === 'monthly'){
      setIncome(allIncome.filter(i => moment(i.datee).isSame(currentDate, 'month')))
    }
    else if(e.target.value === 'weekly'){
      setIncome(allIncome.filter(i => moment(i.datee).isSame(currentDate, 'week')))
    }
    else if(e.target.value === 'daily'){
      setIncome(allIncome.filter(i => dayjs(i.datee).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')))
    }
  }

  const paginate = (pageNumber) =>{
    setActive(pageNumber)
}

    return(
        <div>
            <Header /><br/><br/>
            {loading ? 
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 80}}>
                  <Loader
                   type="Circles"
                   color="gray"
                   height={70}
                   width={70}
                  />
              </div> : 

<div className='bodyy'>
<div>
    <h3 style={{color: '#1F3DA8', textAlign: 'center', marginTop: 50, fontWeight: 'bold'}}>Income History</h3><br/>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
    <h5 style={{color: '#1F3DA8', textAlign: 'center', fontWeight: 'bold'}}>Sort by:</h5>
    <select className='sel' onChange={onFilter}>
        <option value='yearly'>Yearly</option>
        <option value='monthly'>Monthly</option>
        <option value='weekly'>Weekly</option>
        <option value='daily'>Daily</option>
    </select>
    
    </div>
</div><br/>
<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
<input type='text' className='usertext' placeholder='search' 
  onKeyUp={onSearch}
/>
</div><br/>
<Paginateee currentPage={active} postPerPage={perPage} product={income} total={income.length} paginate={paginate} />

<br/><b/>
</div>
          }
           
            <Footer/>
        </div>
    )}

export default Home;
