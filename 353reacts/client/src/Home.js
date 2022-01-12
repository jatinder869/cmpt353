import React from "react";
import "../src/css/home.css"
import axios from "axios";
import {useHistory} from "react-router-dom";

export const Home = () => {
  const history = useHistory()

  const handleClick = (route) => {
    axios({
      method: 'post',
      url: '/validate-home',
      data: {newRoute: route}
    }).then(d => {
      history.push(d.data.url)
    })
  }

  return (
    <>
      <div className="container">
        <div>
          <h1>LEARN ENGLISH COMMUNITY</h1><br/>
          <h2>HOME</h2>
        </div>
        <section>
          <h2>Staff</h2><br/>
          <input type="submit" value="Add Staff" className={"homeInput"} onClick={() => handleClick("addstaff")}/><br/>
          <input type="submit" value="Edit / Remove Staff" className={"homeInput"} onClick={() => handleClick("editstaff")}/>
        </section>
        <section>
          <h2>Students</h2><br/>
          <input type="submit" value="Add Student" className={"homeInput"} onClick={() => handleClick("newstudent")}/><br/>
          <input type="submit" value="Edit / Remove Student" className={"homeInput"} onClick={() => handleClick("editstudent")}/>
        </section>
      </div>
    </>
  )
}