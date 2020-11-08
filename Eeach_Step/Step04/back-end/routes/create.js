const { request, response } = require('express');
const express = require('express');
const mysql = require('mysql');

const router = express.Router();

let mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'epitech',
    database: 'job_board',
    multipleStatements: true
});
mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Connection create reussi')
    } else {
        console.log('Connection rater \n Error: ' + JSON.stringify(err, undefined, 2));
    }
});


//add ad
router.post('/ads', (request, response) => {
    let ads = request.body;
    console.log(request.body);
    var sql = "SET @idPeople = ?;SET @titre = ?;SET @contenu = ?;INSERT INTO advertissements(idPeople, titre, contenu) values (@idPeople, @titre, @contenu);"
    mysqlConnection.query(sql, [ads.idPeople, ads.titre, ads.contenu], (err, rows, fields) => {
        if (!err) {
            response.send('success')
        } else {
            response.send(err);
        }
    })
})


// add people
router.post('/people', (request, response) => {
    let ads = request.body;
    var sql = "SET @lastName = ?;SET @firstName = ?;SET @statut = ?;SET @mail = ?;SET @mdp = ?;SET @idComp = ?;INSERT INTO people(lastName, firstName, statut, mail, mdp, idComp) values (@lastName, @firstName, @statut, @mail, @mdp, @idComp);"
    mysqlConnection.query(sql, [ads.lastName, ads.firstName, ads.statut, ads.mail, ads.mdp, ads.idComp], (err, rows, fields) => {
        if (!err) {
            response.send('success')
        } else {
            response.send(err);
        }
    })
})




module.exports = router;