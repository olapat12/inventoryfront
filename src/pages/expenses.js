import React,{useState, useEffect} from 'react';
import Footer from '../component/footer';
import Header from '../component/header';
import { Table } from 'react-bootstrap';
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from 'axios';
import { baseUrl } from '../component/constant';
import dayjs from 'dayjs'
import Paginate from '../component/expensesPagination'
import moment from 'moment'


let allExpenses = [];
const Expenses = ()=>{

  
  let price = (i) => (i).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

  const [expenses, setExpense] = useState([])

  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(1)
  const [perPage, setPerpage] = useState(5)
  const history = useHistory();

  useEffect(()=>{

    onCheck()

    axios.get(`${baseUrl}expenses/getall`)
  .then(res =>{
    setExpense(res.data)
    allExpenses=res.data
    setLoading(false)
  })
  .catch(err => setLoading(false))

  }, expenses)

  const onCheck = ()=>{
    axios.get(`${baseUrl}admin/admin/${localStorage.getItem("id")}`)
    .then(res =>{
        if(res.status !== 200){
            history.push("/")
            return
        }
        // setLoad(false)
    })
    .catch(err => history.push("/"))
  }
  
const onFilter = (e)=>{

  const date = new Date();

    var currentDate = moment();
  
  if(e.target.value === 'yearly'){
    setExpense(allExpenses)
  }
  else if(e.target.value === 'monthly'){
    setExpense(allExpenses.filter(i => moment(i.datee).isSame(currentDate, 'month')))
  }
  else if(e.target.value === 'weekly'){
    setExpense(allExpenses.filter(i => moment(i.datee).isSame(currentDate, 'week')))
  }
  else if(e.target.value === 'daily'){
    setExpense(allExpenses.filter(i => dayjs(i.datee).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')))
  }
}

const onSearch = (e)=>{
  setExpense(allExpenses.filter(i => i.idd === e.target.value || dayjs(i.datee).format('YYYY-MM-DD') === dayjs(e.target.value).format('YYYY-MM-DD')))
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
    <h3 style={{color: '#1F3DA8', textAlign: 'center', marginTop: 50, fontWeight: 'bold'}}>Expenses History</h3><br/>
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
<Paginate  currentPage={active} postPerPage={perPage} product={expenses} total={expenses.length} paginate={paginate} />

</div> 
           }
            
            <Footer/>
        </div>
    )
}
export default Expenses;
