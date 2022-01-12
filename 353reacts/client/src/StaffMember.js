import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import axios from "axios"
import "../src/css/addstaff.css"

export const StaffMember = () => {
    const {id} = useParams()
    const history = useHistory()
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        address: "",
        phone: "",
        email: "",
        startdate: "",
        available: "n/a",
      })

    useEffect(() => {
        axios({
            method: 'get',
            url: `/editstaff/${id}`,
          }).then(d => {
              if (d.data.url) {
                history.push(d.data.url)
              } else {
                setValues(d.data[0])
              }
          })
    }, [id,history])

    const handleSubmit = () => {
        axios({
          method: 'post',
          url: `/editstaff/${id}`,
          data: values
        }).then(d => {
          history.push(d.data.url)
        })
      }

    return (
        <div className="container">
          <div>
            <h1>LEARNING ENGLISH COMMUNITY</h1>
          </div>
          <form action="/home" method="GET" className="home-button">
            <input type="submit" value="HOME" id="home"/>
          </form>
          <br/>
          <div>
            <h2>Edit Staff</h2>
            <div className="form-container">
              <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }} className="add-form">
                <label htmlFor="fname">First Name</label><br/>
                <input type="text" id="fname" name="firstname" required placeholder="John"
                       value={values.firstname} onChange={(event) => setValues(prevState => {
                  return {...prevState, firstname: event.target.value}
                })}/><br/>
    
                <label htmlFor="lname">Last Name</label><br/>
                <input type="text" id="lname" name="lastname" required placeholder="Doe"
                       value={values.lastname} onChange={(event) => setValues(prevState => {
                  return {...prevState, lastname: event.target.value}
                })}/><br/>
    
                <label htmlFor="adrs">Address</label><br/>
                <input type="text" id="adrs" name="address" required placeholder="123 Maple St Any Town"
                       value={values.address} onChange={(event) => setValues(prevState => {
                  return {...prevState, address: event.target.value}
                })}/><br/>
    
                <label htmlFor="email">Email</label><br/>
                <input type="int" id="email" name="email" required placeholder="john.doe@email.com"
                       value={values.email} onChange={(event) => setValues(prevState => {
                  return {...prevState, email: event.target.value}
                })}/><br/>
    
              
                <label htmlFor="available">Availability</label><br/>
                    <select name="available" id="days"  required value={values.available}
                        onChange={(event) => setValues(prevState => {
                          return {...prevState, available: event.target.value}
                        })}>
                        <option value="n/a" disabled hidden>Choose Days Available</option>
                        <option value="mondaytuesday">Monday-Tuesday</option>
                        <option value="wednesdaythursday">Wednesday-Thursday</option>
                        <option value="fridaysaturday">Friday-Saturday</option>
                    </select><br/>
    
                <input type="submit" value={"Submit Form"}/>
              </form>
            </div>
          </div>
        </div>
    
      )
}