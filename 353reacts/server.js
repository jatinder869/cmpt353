"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var session = require('express-session');
const mysql = require('mysql');
var PORT = 8080;

var path = require('path')

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'project',
    password: 'password'
});

connection.connect(err=>{
    if(err){
        throw err+"kaka";
    }
    console.log("MYSQL conncetion succesful..");
})

app.post("/login",(req,res)=>{
    var username = req.body.username;
	var password = req.body.password;
    if (username && password) {
		connection.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
                res.send({url:'/home'})
		   }
           else{
            res.send({url:'/loginerror'})
           } 		
		});
	}
})
app.post('/validate-home', (req,res)=>{
    const newRoute = req.body.newRoute
	if (req.session.loggedin){
		res.send({url: newRoute})
	} else {
		res.send({url: '/loginerror'})
	}
})

app.post("/addstaff",(req,res)=>{
    const {
		firstName,
		lastName,
		address,
		phone,
        email,
		startDate,
        availability,
	  } = req.body
    const intphone = parseInt(phone)
    const startdate = new Date(startDate).toISOString().slice(0, 10)
    if (req.session.loggedin) {
        var sql = "INSERT INTO staff (firstname, lastname,address,phone,email,startdate,available) VALUES ('"+firstName+"','"+lastName+"','"+address+"','"+intphone+"','"+email+"','"+startdate+"','"+availability+"')";
        connection.query(sql,err=>{
            if(err){
                res.send({url:undefined})
                throw err;
            }
        })
        res.send({url:"/editstaff"})
        }   
    else {
        res.send({url:"/loginerror"})
    }
})

app.post("/addstudent",(req,res)=>{
    const {
		firstName,
		lastName,
		address,
		phone,
		joiningDate,
		firstLanguage,
		currEngLevel,
		currSchool
	  } = req.body
    const intphone = parseInt(phone) 
    const newjoindate = new Date(joiningDate).toISOString().slice(0, 10)
    if (req.session.loggedin) {
        var curdate = new Date().toISOString().slice(0, 10)
        var sql = "INSERT INTO students (firstname, lastname,address,phone,joindate,firstlanguage,startenglevel,currenglevel,curleveldate,school) VALUES ('"+firstName+"','"+lastName+"','"+address+"','"+intphone+"','"+newjoindate+"','"+firstLanguage+"','"+currEngLevel+"','"+currEngLevel+"','"+curdate+"','"+currSchool+"')";
        connection.query(sql,err=>{
            if(err){
                res.send({url:undefined})
                throw err;
            }
        })
        res.send({url:'/editstudent'})
    }
    else {
        res.send({url:'/loginerror'})
    }
})

app.get("/getstaff",(req,res)=>{
    if (req.session.loggedin) { 
        var sql = "SELECT * FROM staff;"
        connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    } 
    else {
		res.send({url:'/loginerror'})
	}
})

app.get("/getstudent",(req,res)=>{
    if (req.session.loggedin) {
        var sql = "SELECT * FROM students;"
        connection.query(sql, function (err, result, fields) {
        if (err) throw err;
            res.json(result);
        });
    } 
    else {
		res.send({url:'/loginerror'})
	}
})

app.get("/editstaff/:id",(req,res)=>{
    if (req.session.loggedin) {
        const phone = req.params.id
        var sql = `SELECT * FROM staff WHERE phone = ${phone};`
        connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        });
    } 
    else {
		res.send({url:'loginerror'})
	}
})

app.post("/editstaff/:id",(req,res)=>{
    if(req.session.loggedin){
        const phone = req.params.id

        const {firstname, lastname, address,email ,available}=req.body;
        var sql = `UPDATE staff SET firstname = "${firstname}", lastname = "${lastname}", address = "${address}", email = "${email}", available = "${available}" WHERE phone = ${phone};`
        console
        connection.query(sql, function (err, result, fields) {
            if (err) {
                res.send({url:"/loginerror"})
                throw err
            };
            res.send({url:"/editstaff"})
            });
    }
    else{
        res.send({url:"/loginerror"})
    }
})

app.delete(`/deletestaff/:id`,(req,res)=>{
    if (req.session.loggedin) {
        var phone = req.params.id
        var sql = `DELETE FROM staff WHERE phone = "${phone}"`
        connection.query(sql,function(err,data){
        if(err) {
            res.send({url:'/loginerror'})
            throw err;
        }
        res.send({url:undefined})
        })
    } 
    else {
        res.send({url:'/loginerror'})
    }
})


app.delete("/deletestudent/:id",(req,res)=>{
    if (req.session.loggedin) {
        var phone = req.params.id
        var sql = `DELETE FROM students WHERE phone = "${phone}"`
        connection.query(sql,function(err,data){
            if(err) {
                res.send({url:'/loginerror'})
                throw err;
            }
            res.send({url:undefined})
            })
        } 
        else {
            res.send({url:'/loginerror'})
        }
    })

app.get("/student/addreport/:phone/r",(req,res)=>{
    if(req.session.loggedin){
        var phone = req.params.phone;
        var sql = `SELECT * FROM students WHERE phone = ${phone}` 
        connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result[0])
        });
    }
    else{
        res.send({url:'/loginerror'})
    }
})
app.post("/student/addreport/:phone/p",(req,res)=>{
    if(req.session.loggedin){
        var report = req.body.report
        var phone = req.params.phone;
        var sql = `UPDATE students SET report = "${report}"  WHERE phone = "${phone}"` 
        connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send("ADDED")
        });
    }
    else{
        res.send({url:"/loginerror"})
    }
})

app.put("/editstudent/:id/:decrease",(req,res)=>{
    if (req.session.loggedin) {
        var phone = req.params.id
        var curdate = new Date().toISOString().slice(0, 10)
        const decrease = req.params.decrease
        if (decrease == "decrease"){
            var sql = `UPDATE students SET currenglevel=currenglevel-1 WHERE phone = "${phone}"`
            var sql2 = `UPDATE students SET curleveldate="${curdate}" WHERE phone = "${phone}"`
        }
        else{
            var sql = `UPDATE students SET currenglevel=currenglevel+1 WHERE phone = "${phone}"`
            var sql2 = `UPDATE students SET curleveldate="${curdate}" WHERE phone = "${phone}"`
        }
        connection.query(sql,function(err,data){
        if(err) throw err
            connection.query(sql2,function(err,data){
            if(err) throw err
            res.send({url:undefined});
            })
        })
    } 
    else {
        res.send({url:"/loginerror"})
    }
})

app.listen(PORT, (error)=>{
    if (error) throw error
    console.log("Server created Successfully on PORT", PORT)
})