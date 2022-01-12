import axios from "axios"
import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom";
import "../src/css/staff.css"
import "../src/css/addstaff.css"
export const EditStaff = () => {
    const history = useHistory()
    const [data, setData] = useState()
    const [search,setSearch] = useState()

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = () => {
        axios({
            method: 'get',
            url: '/getstaff',
          }).then(d => {
              if (d.data.url) {
                history.push(d.data.url)
              } else {
                setData(d.data)
              }
          })
    }

    const deleteStaff = (phone) => {
        axios({
            method: 'delete',
            url: `/deletestaff/${phone}`,
          }).then(d => {
              if (!d.data.url){
                fetchData()
              } else {
                history.push(d.data.url)
              }
          })
        }

        const handleSearch=(value)=>{
            if(value){
            const filteredList=data.filter(oneStaff=>{
                const lowerLastName=oneStaff.lastname.toLowerCase()
                const lowerValue=value.toLowerCase()
                if(lowerLastName.includes(lowerValue)){
                    return true
                }
                else{
                    return false
                }
            }) 
            setData(filteredList)
        }
        else{
            fetchData()
        }
        }

      return (
        <div className="container">
        <div>
            <h1>LEARNING ENGLISH COMMUNITY</h1>
        </div>
        <div>
            <h2>Staff Members</h2>
                <form action="/home" method="GET" className="home-button">
                    <input type="submit" value="HOME"/>
                </form><br/>
                <form className="search-form">
                    <label style={{borderRadius:"5x"}}>
                        Search By Last Name:
                    <input id="search" style={{borderRadius:"5px"}} type="text" value={search} onChange={(event)=>
                        handleSearch(event.target.value)}/>
                    </label>
                </form><br/>
            <div id="table">
                <table>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Adress</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Start Date</th>
                    <th>Available Days</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
                {
                    data && data.map(value => {
                        const startdate = new Date(value.startdate).toDateString()

                        return (
                            <tr key={value.phone}>
                                <td>{value.firstname}</td>
                                <td>{value.lastname}</td>
                                <td>{value.address}</td>
                                <td>{value.phone}</td>
                                <td>{value.email}</td>
                                <td>{startdate}</td>
                                <td>{value.available}</td>
                                <td><button id="${value.phone}" onClick={() => {
                                    deleteStaff(value.phone)
                                }}>Delete Staff Member</button></td>
                                <td><button id="${value.phone}" onClick={() => {
                                     history.push(`/staff/${value.phone}`)
                                }}>Edit Staff Member</button></td>

                            </tr>
                        )
                    })
                }
                </table>
            </div> 
        </div>
    </div>
    )
}