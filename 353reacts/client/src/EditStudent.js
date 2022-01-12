import axios from "axios"
import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom";
import "../src/css/addstaff.css"

export const EditStudent = () => {
    const history = useHistory()
    const [data, setData] = useState([])
    const [disButton,setDisButton] = useState(false)
    const [search,setsearch] = useState()

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = () => {
        axios({
            method: 'get',
            url: '/getstudent',
          }).then(d => {
              if (d.data.url) {
                history.push(d.data.url)
              } else {
                setData(d.data)
              }
          })
    }

    const changeLevel=(phone,decrease)=>{
        axios({
            method:`PUT`,
            url:`/editstudent/${phone}/${decrease ? "decrease" : "increase"}`,
        }).then(d => {
            if (d.data.url){
                history.push(d.data.url)
            }
            else {
                setDisButton(false)
                fetchData()
            }
        })
    }

    const deletestudent = (phone) => {
        axios({
            method: 'delete',
            url: `/deletestudent/${phone}`,
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
            const filteredList=data.filter(oneStudent=>{
                const lowerLastName=oneStudent.lastname.toLowerCase()
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
            <h2>Students</h2>
                <form action="/home" method="GET" className="home-button">
                    <input type="submit" value="HOME"/>
                </form><br/>
                <form className="search-form">
                <label>
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
                    <th>Join Date</th>
                    <th>First Language</th>
                    <th>Starting ENG Level</th>
                    <th>Current ENG Level</th>
                    <th>Current Level Date</th>
                    <th>School</th>
                    <th>Decrease ENG Level</th>
                    <th>Increase ENG Level</th>
                    <th>Delete</th>
                    <th>Report</th>
                </tr>
                {
                    data && data.map(value => {
                        const joindate = new Date(value.joindate).toDateString()
                        const currdate = new Date(value.curleveldate).toDateString()
                        return (
                            <tr key={value.phone}>
                                <td>{value.firstname}</td>
                                <td>{value.lastname}</td>
                                <td>{value.address}</td>
                                <td>{value.phone}</td>
                                <td>{joindate}</td>
                                <td>{value.firstlanguage}</td>
                                <td>{value.startenglevel}</td>
                                <td>{value.currenglevel}</td>
                                <td>{currdate}</td>
                                <td>{value.school}</td>
                                <td><button id="${value.phone}" disabled={disButton} onClick={() => {
                                    if(value.currenglevel>0) {
                                        setDisButton(true)
                                        changeLevel(value.phone,true)
                                    }
                                }}>Decrease ENG Level</button></td>
                                <td><button id="${value.phone}"  disabled={disButton} onClick={() => {
                                    if(value.currenglevel<3) {
                                        setDisButton(true)
                                        changeLevel(value.phone,false)
                                    }
                                }}>Increase ENG Level</button></td>
                                <td><button id="${value.phone}" onClick={() => {
                                    deletestudent(value.phone)
                                }}>Delete</button></td>
                                <td><button id="${value.phone}" onClick={() => {
                                     history.push(`/student/addreport/${value.phone}/r`)
                                }}>Report</button></td>

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