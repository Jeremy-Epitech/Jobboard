//Imports
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const fs = require('fs');
const http = require('http');


const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});


app.use('/create', require('./routes/create'))
app.use('/edit', require('./routes/edit'))
app.use('/read', require('./routes/read'))
app.use('/login', require('./routes/login'))
app.use('/delete', require('./routes/delete'))

let server = http.createServer();


app.listen(port);