import React, {useState} from "react";
import "../src/css/addstaff.css"
import axios from "axios";
import {useHistory} from "react-router-dom";

export const AddStaff = () => {
  const history = useHistory()
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    startDate: "",
    availability: "n/a",
  })

  const handleSubmit = () => {
    axios({
      method: 'post',
      url: '/addstaff',
      data: values
    }).then(d => {
      // console.log(d)
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
        <h2>Add New Staff</h2>
        <div className="form-container">
          <form className="add-form" onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}>
            <label htmlFor="fname">First Name</label><br/>
            <input type="text" id="fname" name="firstname" required placeholder="John"
                   value={values.firstName} onChange={(event) => setValues(prevState => {
              return {...prevState, firstName: event.target.value}
            })}/><br/>

            <label htmlFor="lname">Last Name</label><br/>
            <input type="text" id="lname" name="lastname" required placeholder="Doe"
                   value={values.lastName} onChange={(event) => setValues(prevState => {
              return {...prevState, lastName: event.target.value}
            })}/><br/>

            <label htmlFor="adrs">Address</label><br/>
            <input type="text" id="adrs" name="address" required placeholder="123 Maple St Any Town"
                   value={values.address} onChange={(event) => setValues(prevState => {
              return {...prevState, address: event.target.value}
            })}/><br/>

            <label htmlFor="phn">Phone</label><br/>
            <input type="int" id="phn" name="phone" required placeholder="1234567890"
                   value={values.phone} onChange={(event) => setValues(prevState => {
              return {...prevState, phone: event.target.value}
            })}/><br/>

            <label htmlFor="email">Email</label><br/>
            <input type="int" id="email" name="email" required placeholder="john.doe@email.com"
                   value={values.email} onChange={(event) => setValues(prevState => {
              return {...prevState, email: event.target.value}
            })}/><br/>

            <label htmlFor="startDate">Start Date</label><br/>
            <input type="date" id="startDate" name="startDate" required min="2021-12-01"
                   value={values.startDate} onChange={(event) => setValues(prevState => {
              return {...prevState, startDate: event.target.value}
            })}/><br/>

             
            <label htmlFor="available">Availability</label><br/>
                <select name="available" id="days"  required value={values.availability}
                    onChange={(event) => setValues(prevState => {
                      return {...prevState, availability: event.target.value}
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