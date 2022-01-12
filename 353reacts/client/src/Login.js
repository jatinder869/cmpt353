import React, {useState} from "react"
import '../src/css/login.css'
import {useHistory} from "react-router-dom"
import axios from "axios";

export const Login = () => {
  const [values, setValues] = useState({
    user: "",
    password: ""
  })
  const history = useHistory()

  const handleSubmit = () => {
    axios({
      method: 'post',
      url: '/login',
      data: {username: values.user, password: values.password}
    }).then(d => {
      history.push(d.data.url)
    })
  }


  return (
    <div className="container">
      <h1>LEARN ENGLISH COMMUNITY</h1>
      <section>
        <div className="login-form">
          <h2>STAFF ADMIN LOGIN</h2>
          <form onSubmit={(e)=>{
              e.preventDefault()
              handleSubmit()
          }}>
          <input type="text" name="username" id="username" placeholder="Username"
                 value={values.user} required
                 onChange={(event) => setValues(prevState => {
                   return {...prevState, user: event.target.value}
                 })}
          />
          <input type="password" name="password" id="password" placeholder="Password"
                 value={values.password} required
                 onChange={(event) => setValues(prevState => {
                   return {...prevState, password: event.target.value}
                 })}
          />
          <input type="submit" value="LOGIN"/>
          </form>
        </div>
      </section>
    </div>
  )
}