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
        console.log('Connection delete reussi')
    } else {
        console.log('Connection rater \n Error: ' + JSON.stringify(err, undefined, 2));
    }
});


//delete people by id
router.delete('/people/:id', (request, response) => {
    mysqlConnection.query('DELETE FROM people WHERE idPeople = ? ', [request.params.id], (err, rows, fields) => {
        if (!err) {
            response.send(rows);
        } else {
            response.send(err);
        }
    })
})


//delete comp by id
router.delete('/companies/:id', (request, response) => {
    mysqlConnection.query('DELETE FROM companies WHERE idComp = ?', [request.params.id], (err, rows, fields) => {
        if (!err) {
            response.send('Delete successfull');
        } else {
            response.send(err);
        }
    })
})

//Detete Ad by id
router.delete('/ads/:id', (request, response) => {
    mysqlConnection.query('DELETE FROM advertissements WHERE idAd = ?', [request.params.id], (err, rows, fields) => {
        if (!err) {
            response.send('Delete successfull');
        } else {
            response.send(err);
        }
    })
})

module.exports = router;