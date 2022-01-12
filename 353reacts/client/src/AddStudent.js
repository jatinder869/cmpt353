import React, {useState} from "react";
import "../src/css/addstaff.css"
import axios from "axios";
import {useHistory} from "react-router-dom";

export const AddStudent = () => {
  const history = useHistory()
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    joiningDate: "",
    firstLanguage: "",
    currEngLevel: 0,
    currSchool: 0
  })

  const handleSubmit = () => {
    axios({
      method: 'post',
      url: '/addstudent',
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
        <h2>Add New Student</h2>
        <div className="form-container">
          <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }} className="add-form">
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

            <label htmlFor="joindate">Joining Date</label><br/>
            <input type="date" id="joindate" name="joindate" required
                   value={values.joiningDate} onChange={(event) => setValues(prevState => {
              return {...prevState, joiningDate: event.target.value}
            })}/><br/>

            <label htmlFor="firstlanguage">First Language</label><br/>
            <input type="text" id="firstlanguage" name="firstlanguage" required placeholder="hindi"
                   value={values.firstLanguage} onChange={(event) => setValues(prevState => {
              return {...prevState, firstLanguage: event.target.value}
            })}/><br/>

            <select name="startenglevel" id="startenglevel" required value={values.currEngLevel}
                    onChange={(event) => setValues(prevState => {
                      return {...prevState, currEngLevel: event.target.value}
                    })}>
              <option value={0} disabled hidden>Choose Start English level</option>
              <option value={1}>Level 1</option>
              <option value={2}>Level 2</option>
            </select><br/>

            <select name="curschool" id="curschool" required value={values.currSchool}
                    onChange={(event) => setValues(prevState => {
                      return {...prevState, currSchool: event.target.value}
                    })}>
              <option value="" disabled hidden>Choose Current School</option>
              <option value="NA">No school</option>
              <option value="Usask">University Of Saskatchewan</option>
              <option value="PolyTech">Sask Polytechnic</option>
            </select><br/>


            <input type="submit" value={"Submit Form"}/>
          </form>
        </div>
      </div>
    </div>

  )
}