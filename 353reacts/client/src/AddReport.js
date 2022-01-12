import axios from "axios"
import React, {useEffect, useState} from "react"
import {useHistory, useParams} from "react-router-dom";
import "../src/css/staff.css"
import "../src/css/addstaff.css"

export const AddReport = () => {
    const history = useHistory()
    const {phone} = useParams()
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        joindate: "",
        firstlanguage: "",
        startenglevel: "",
        currenglevel: "",
        curleveldate: "",
        report: ""
    })

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = () => {
        axios({
            method: 'GET',
            url: `/student/addreport/${phone}/r`,
          }).then(d => {
              if (d.data.url) {
                history.push(d.data.url)
              } else {
                setData(d.data)
              }
          })
    }

    

    const addReport = () => {
        axios({
            method: 'POST',
            url: `/student/addreport/${phone}/p`,
            data: data
          }).then(d => {
              if (d.data.url){
                history.push(d.data.url)
              } else {
                  alert("Report added succesfully.")
                  fetchData()
              }
          })
        }

      return (
        <div className="container">
        <div>
            <h1>LEARNING ENGLISH COMMUNITY</h1>
        </div>
        <div>
            <h2>Student</h2>
                <form action="/home" method="GET" className="home-button">
                    <input type="submit" value="HOME" id = "home"/>
                </form><br/>
            <div id="table" style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <table>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Join Date</th>
                    <th>First Language</th>
                    <th>Starting ENG Level</th>
                    <th>Current ENG Level</th>
                    <th>Current Level Date</th>
                </tr>
                {data && <tr>
                    <td>{data.firstname}</td>
                    <td>{data.lastname}</td>
                    <td>{new Date(data.joindate).toDateString()}</td>
                    <td>{data.firstlanguage}</td>
                    <td>{data.startenglevel}</td>
                    <td>{data.currenglevel}</td>
                    <td>{new Date(data.curleveldate).toDateString()}</td>
                </tr>}
          
                </table>
                <div>
                <h1>Report</h1><br/>
                <textarea name="report" id="report" cols="100" rows="10" value={data?.report ?? ""} onChange={(event)=>{
                    setData(prevState => {
                        return {...prevState, report: event.target.value}
                    })
                }}></textarea><br/>
                <button type="button" onClick={()=>addReport()} className="report-button">ADD REPORT</button>
                </div>
            </div> 
        </div>
    </div>
    )
}