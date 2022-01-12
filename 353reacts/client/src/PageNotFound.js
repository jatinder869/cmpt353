import React from "react";
import "../src/css/home.css"

export const PageNotFound = () => {

  return (
    <>
      <div className="container">
            <h1>LEARN ENGLISH COMMUNITY</h1>
        <section>
            <div className="login-error">
                <h2>ERROR 404 PAGE NOT FOUND</h2>
            </div>    
            <div>
                <form action="/home" method="GET" className="login-form">
                    <input type="submit" value="Home"/>
                </form><br/>
            </div>
        </section>
    </div>
    </>
  )
}