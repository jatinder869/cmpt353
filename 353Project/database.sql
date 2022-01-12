CREATE DATABASE IF NOT EXISTS project;
USE project;
CREATE TABLE staff(
    id int NOT NULL auto_increment,
    firstname varchar(255),
    lastname varchar(255),
    address varchar(255),
    phone varchar(255),
    email varchar(255),
    startdate DATE,
    availabile varchar(255),
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
);

CREATE TABLE students(
    id int NOT NULL auto_increment,
    firstname varchar(255),
    lastname varchar(255),
    address varchar(255),
    phone varchar(255),
    joindate DATE,
    firstlanguage varchar(255),
    startenglevel int,
    currenglevel int,
    curleveldate DATE,
    school varchar(255),
    report varchar(5000),
    PRIMARY KEY(id)
);

CREATE TABLE admin(
	id int NOT NULL auto_increment,
    username varchar(255),
    password varchar(255),
	PRIMARY KEY(id)
);
INSERT INTO admin (username,password)
VALUES ('admin','password');