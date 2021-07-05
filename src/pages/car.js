import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap';

const Car = ()=>{

    const [allCar, setAllcar] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        axios.get('https://autobackend20.herokuapp.com/all')
        .then(res=> {
            setAllcar(res.data)
            setLoading(false)
        })
        .catch(err => setLoading(false))
    })

    return(
        <>
        <h3 style={{textAlign: 'center', marginTop: 20}}>History</h3><br/><br/>
        <div className='tablee'>
        <Table striped bordered hover >
                     <thead className='titlee'>
                     <tr>
                     <th>ID</th>
                     <th>Fuel Level</th>
                     <th>Speed</th>
                     </tr>
                    </thead>
                    <tbody>
                        {allCar && allCar.map(i =>(
                            <tr>
                                <td>{i._id}</td>
                                <td>{i.fuelLevel}</td>
                                <td>{i.speed}</td>
                            </tr>
                        ))}
                    </tbody>
       </Table>
        </div>
        </>
    )
}
export default Car;