import React from "react";
import "../src/css/home.css"

export const LoginError = () => {

  return (
    <>
      <div className="container">
            <h1>LEARN ENGLISH COMMUNITY</h1>
        <section>
            <div className="login-error">
                <h2>STAFF ADMIN LOGIN FAILED</h2>
            </div>    
            <div>
                <form action="/" method="GET" className="login-form">
                    <input type="submit" value="LOGIN AGAIN" id = "login"/>
                </form><br/>
            </div>
        </section>
    </div>
    </>
  )
}