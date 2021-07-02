import React from 'react'
import Pagination from 'react-js-pagination'
import { Table } from 'react-bootstrap';
import dayjs from 'dayjs'
import axios from 'axios'
import { baseUrl } from './constant';
import { useHistory } from "react-router";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Paginate = ({currentPage, postPerPage, total, paginate, product})=>{

    const history = useHistory();

    const onRemove = (id)=>{

      confirmAlert({
        title: 'Delete',
        message: 'Are you sure you want to remove this item from cartlist ?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => remove(id)
          },
          {
            label: 'Keep',
            onClick: () => console.log('Click No')
          }
        ]
      })
    };
    
  
    const view = (id)=>{
        history.push(`/viewexpenses/${id}`)
      }
    
      const edit = (id)=>{
        history.push(`/editexpenses/${id}`)
      }
    
      const remove = (id)=>{
        let status;
        axios.delete(`${baseUrl}expenses/delete/${id}`)
        .then(res =>{
          status = res.status
        })
        .then(()=>{
          if(status === 200){
            product.filter(i => i._id !== id)
          }
        })
        .catch(err => console.log(err))
      }
  
    const indexoflastPost = currentPage * postPerPage;
    const indexoffirstPost = indexoflastPost - postPerPage;
    product = product.slice(indexoffirstPost, indexoflastPost);

    return(
      <>
      <div className='tablee'>
      <Table striped bordered hover >
<thead className='titlee'>
<tr>
<th className='myshoww'>ID</th>
<th>Date</th>
<th>Title</th>
<th>Amount</th>
<th>Action</th>
</tr>
</thead>
<tbody>
  { product.map(i =>(
    <tr className='childd' key={i._id}>
    <td className='myshoww'>{i.idd}</td>
    <td>{dayjs(i.datee).format('YYYY-MM-DD HH:mm')}</td>
    <td>{i.title}</td>
    <td>{i.amount}</td>
    <td className='yoga'>
    <button className='lookbtn' style={{color: '#607eeb'}} onClick={()=>view(i._id)}>View</button>
    <button className='lookbtn' style={{color: 'green', border: ' border: solid 2px green' }} onClick={()=>edit(i._id)}>Edit</button>
    <button className='lookbtn' style={{color: 'red'}} onClick={()=>onRemove(i._id)}>Delete</button>
    </td>
    </tr>
  ))
  // <tr><td colSpan='5' style={{textAlign: 'center'}}>No record found</td></tr>
  }

</tbody>
</Table>
</div>
<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
        <Pagination
        itemClass="page-item"
        linkClass="page-link"
        activePage={currentPage}
        itemsCountPerPage={postPerPage}
        totalItemsCount={total}
        pageRangeDisplayed={2}
        onChange={paginate}
        prevPageText="Prev"
        firstPageText="First"
        lastPageText="Last"
        nextPageText="Next"
      />
      </div>
      </>
    )
}
export default Paginate;