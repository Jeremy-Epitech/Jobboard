const mysql = require('mysql');
const express = require('express');
const { request, response } = require('express');
const router = require('express').Router();


let mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'epitech',
    database: 'job_board',
    multipleStatements: true
});
mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Connection read reussi')
    } else {
        console.log('Connection rater \n Error: ' + JSON.stringify(err, undefined, 2));
    }
});



//Show ad
router.get('/ads', (request, response) => {
    mysqlConnection.query('SELECT * FROM advertissements', (err, rows, fields) => {
        if (!err) {
            response.send(rows);
        } else {
            response.send(err);
        }
    })
})

//Show ad by id
router.get('/ads/:id', (request, response) => {
    mysqlConnection.query('SELECT * FROM advertissements WHERE idAd = ?', [request.params.id], (err, rows, fields) => {
        if (!err) {
            response.send(rows);
        } else {
            response.send(err);
        }
    })
})


//Show comp
router.get('/companies', (request, response) => {
    mysqlConnection.query('SELECT * FROM companies', (err, rows, fields) => {
        if (!err) {
            response.send(rows);
        } else {
            response.send(err);
        }
    })
})

//Show comp by id
router.get('/companies/:id', (request, response) => {
    mysqlConnection.query('SELECT * FROM companies WHERE idComp = ?', [request.params.id], (err, rows, fields) => {
        if (!err) {
            response.send(rows);
        } else {
            response.send(err);
        }
    })
})


//show people
router.get('/people', (request, response) => {
    mysqlConnection.query('SELECT * FROM people', (err, rows, fields) => {
        if (!err) {
            response.send(rows);
        } else {
            response.send(err);
        }
    })
})

//show people by id
router.get('/people', (request, response) => {
    mysqlConnection.query('SELECT * FROM people WHERE idAd = ? ', [request.params.id], (err, rows, fields) => {
        if (!err) {
            response.send(rows);
        } else {
            response.send(err);
        }
    })
})



module.exports = router;