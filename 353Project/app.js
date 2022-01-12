"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var session = require('express-session');
const mysql = require('mysql');
var PORT = 5000;

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

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/html/login.html")
})

app.post("/login",(req,res)=>{
    var username = req.body.username;
	var password = req.body.password;
	req.session.loggedin = true;
    if (username && password) {
		connection.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				// req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/home');
			} else {
				res.sendFile(__dirname+"/html/loginerror.html")
			}			
		});
	} else {
		res.sendFile(__dirname+"/html/loginerror.html")
	}
})
app.get("/loginerror",(req,res)=>{
    res.redirect("/")
})
app.get("/home", (req, res)=>{
    if (req.session.loggedin) {
		res.sendFile(__dirname+"/html/index.html")
	} else {
		res.sendFile(__dirname+"/html/loginerror.html")
	}
})

app.get("/newstaff", (req, res)=>{
    if (req.session.loggedin) {
		res.sendFile(__dirname+"/html/addstaff.html")
	} else {
		res.sendFile(__dirname+"/html/loginerror.html")
	}
})

app.get("/removestaff", (req, res)=>{
    if (req.session.loggedin) {
        res.sendFile(__dirname+"/html/staff.html")
	} else {
		res.sendFile(__dirname+"/html/loginerror.html")
	} 
})

app.get("/removestudent", (req, res)=>{
    if (req.session.loggedin) {
        res.sendFile(__dirname+"/html/students.html")
	} else {
		res.sendFile(__dirname+"/html/loginerror.html")
	}
})


app.post("/addstaff",(req,res)=>{
    if (req.session.loggedin) {
        const {firstname, lastname,address,phone,email,available,startdate }=req.body
        var sql = "INSERT INTO staff (firstname, lastname,address,phone,email,startdate,available) VALUES ('"+firstname+"','"+lastname+"','"+address+"','"+phone+"','"+email+"','"+startdate+"','"+available+"')";
        connection.query(sql,err=>{
            if(err){
                throw err;
            }
        })
        res.redirect("/removestaff")
        }   
    else {
        res.sendFile(__dirname+"/html/loginerror.html")
    }
})

app.get("/newstudent", (req, res)=>{
    if (req.session.loggedin) {
        res.sendFile(__dirname+"/html/addstudent.html")
	} else {
		res.sendFile(__dirname+"/html/loginerror.html")
	}
})

app.post("/addstudent",(req,res)=>{
    if (req.session.loggedin) {
        var curdate = new Date().toISOString().slice(0, 10)
        const {firstname, lastname,address,phone,joindate,firstlanguage,startenglevel,curschool}=req.body
        var sql = "INSERT INTO students (firstname, lastname,address,phone,joindate,firstlanguage,startenglevel,currenglevel,curleveldate,school) VALUES ('"+firstname+"','"+lastname+"','"+address+"','"+phone+"','"+joindate+"','"+firstlanguage+"','"+startenglevel+"','"+startenglevel+"','"+joindate+"','"+curschool+"')";
        connection.query(sql,err=>{
            if(err){
                throw err;
            }
        })
        res.redirect("/removestudent")
    }
    else {
        res.sendFile(__dirname+"/html/loginerror.html")
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
		res.sendFile(__dirname+"/html/loginerror.html")
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
		res.sendFile(__dirname+"/html/loginerror.html")
	}
})

app.delete(`/deletestaff/:id`,(req,res)=>{
    if (req.session.loggedin) {
        var phone = req.params.id
        var sql = `DELETE FROM staff WHERE phone = ${phone}`
        connection.query(sql,function(err,data){
        if(err) throw err;
        })
    } 
    else {
        res.sendFile(__dirname+"/html/loginerror.html")
    }
})


app.post("/deletestudent/:id",(req,res)=>{
    if (req.session.loggedin) {
        var phone = req.params.id
        var sql = `DELETE FROM students WHERE phone = ${phone}`
        connection.query(sql,function(err,data){
        if(err) throw err
        })
    }
    else {
        res.sendFile(__dirname+"/html/loginerror.html")
    }
})
app.get("/student/addreport/:phone",(req,res)=>{
    if(req.session.loggedin){
        var phone = req.params.phone;
        res.sendFile(__dirname+"/html/reports.html")
    }
    else{
        res.sendFile(__dirname+"/html/loginerror.html")
    }
})
app.get("/student/addreport/:phone/r",(req,res)=>{
    if(req.session.loggedin){
        var phone = req.params.phone;
        var sql = `SELECT * FROM students WHERE phone = "${phone}"` 
        connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.send(result[0])
        });
    }
    else{
        res.sendFile(__dirname+"/html/loginerror.html")
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
        res.sendFile(__dirname+"/html/loginerror.html")
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
                res.send('done');
        })
        })
    } 
    else {
        res.sendFile(__dirname+"/html/loginerror.html")
    }
})

app.listen(PORT, (error)=>{
    if (error) throw error
    console.log("Server created Successfully on PORT", PORT)
})