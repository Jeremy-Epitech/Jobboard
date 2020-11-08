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
        console.log('Connection edit reussi')
    } else {
        console.log('Connection rater \n Error: ' + JSON.stringify(err, undefined, 2));
    }
});


//add ad
router.put('/ads/:id', (request, response) => {
    let ads = request.body;
    var sql = "SET @idPeople = ?;SET @titre = ?;SET @contenu = ?;UPDATE advertissements SET idPeople = @idPeople ,titre = @titre, contenu = @contenu WHERE idAd = ?;"
    mysqlConnection.query(sql, [ads.idPeople, ads.titre, ads.contenu, request.params.id], (err, rows, fields) => {
        if (!err) {
            response.send('success')
        } else {
            response.send(err);
        }
    })
})


// add people
router.put('/people/:id', (request, response) => {
    let ads = request.body;
    var sql = "SET @lastName = ?;SET @firstName = ?;SET @statut = ?;SET @mail = ?;SET @mdp = ?;SET @idComp = ?;UPDATE people SET lastName = @lastName, firstName = @firstName, statut =  statut, mail = @mail, mdp = @mdp, idComp = @idComp WHERE idPeople = ?;"
    mysqlConnection.query(sql, [ads.lastName, ads.firstName, ads.statut, ads.mail, ads.mdp, ads.idComp, request.params.id], (err, rows, fields) => {
        if (!err) {
            response.send('success')
        } else {
            response.send(err);
        }
    })
})

module.exports = router;