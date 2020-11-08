const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const { response } = require('express');

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
        console.log('Connection login reussi')
    } else {
        console.log('Connection rater \n Error: ' + JSON.stringify(err, undefined, 2));
    }
});


// router.get('/', (request, res) => {
//     res.json({
//         message: 'Hey there! Welcome to this API service',
//     });
// });

router.post('/verify', verifyToken, (request, res) => {
    jwt.verify(request.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(403).json({ error: err + 'error' });
        } else {
            res.json({
                success: 'Posts created...',
                authData,
            });
        }
    });
});

router.post('/', (request, res) => {

    let ads = request.body;
    var sql = "SET @mail = ?;SET @mdp = ?;SELECT idPeople FROM people WHERE mail = @mail AND mdp = @mdp"
    mysqlConnection.query(sql, [ads.mail, ads.mdp], function (error, rows, fields) {

        // if (results.length > 0) {
        //     request.session.loggedin = true;
        //     request.session.username = username;
        //     response.redirect('/home');
        if (!error) {
            var id = rows[2][0]["idPeople"];
            // res.status(200).json(rows[2][0]["idPeople"]);
            const user = {
                id: id,
                email: ads.mail
            };

            jwt.sign({ user: user }, 'secretkey', (err, token) => {
                // res.json({
                //     token,
                // });
                res.json({
                    token,
                });
            });
        } else {
            res.status(404).json(error);

        };
    });


});

router.get('/home', function (request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

function verifyToken(request, res, next) {
    const bearerHeader = request.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]
        request.token = bearerToken
        next()
    } else {
        res.status(403).json({ error: 'Veuillez vous connecter' });
    }
};

module.exports = router;