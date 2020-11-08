// Get Ads
axios.get('http://localhost:8080/read/ads').then(response => {

    for (let i = 0; i < response.data.length; i++) {

        $('.pub').append(
            '<div class="annonce">' +
            '<h2>' + response.data[i].titre + '</h2 > ' +
            '<p class="hidden">' + response.data[i].contenu +
            '<br>' +
            '<button class="appli" value=' + response.data[i].idAd + '>' + 'Appli</button >' +
            '</p > ' +
            '<button class="myBtn">Learn more</button>' +
            '</div>'
        );
    }
    $("p.hidden").hide();
    $(".myBtn").click(showHide);
    $(".appli").click(adId);
    // $("#logbt").click(login);

})

// Show more
function showHide(event) {

    if ($(event.target.parentNode.childNodes[2]).is(":visible")) {
        $(event.target.parentNode.childNodes[2]).hide();
    } else {
        $(event.target.parentNode.childNodes[2]).show();
    }
};

// function post register
function register(event) {

    var LastName = $("form#register>input")[0].value;
    var FirstName = $("form#register>input")[1].value;
    var Statut = $("select").val();
    var Mail = $("form#register>input")[2].value;
    var Mdp = $("form#register>input")[3].value;

    console.log(LastName);
    console.log(Mail);
    console.log(FirstName);
    console.log(Mdp);
    console.log(Statut);

    axios.post('http://localhost:8080/create/people', {
        lastName: LastName,
        firstName: FirstName,
        statut: Statut,
        mail: Mail,
        mdp: Mdp

    })
        .then(function (reponse) {
            //On traite la suite une fois la réponse obtenue 
            console.log(reponse);
            $('main#Register').append(
                '<center>Inscription réussie</center>'
            );
            $('form#register').hide();
        })
        .catch(function (erreur) {
            //On traite ici les erreurs éventuellement survenues
            console.log(erreur);
        })
};

// function appli to a job announce
var idAd1 = 0;
function adId(event) {
    console.log(event.target.value);
    idAd1 = event.target.value;
    $(event.target).hide();
    console.log(idAd1);

    $(event.target.parentNode).append(
        '<form id="Appli">' +
        '<input type="text" placeholder="lastName" name="lastName" required>' +
        '<input type="text" placeholder="firstName" name="firstName" required>' +
        '<input type="email" placeholder="email" name="email" required>' +
        '<input type="text" placeholder="Message" name="message" required>' +
        '<button id="sendBtn" type="submit">Submit</button>' +
        '</form >'
    );

    $('#sendBtn').click(SendMess);
    function SendMess(event) {
        event.preventDefault();

        var LastName = $("form#Appli>input")[0].value;
        var FirstName = $("form#Appli>input")[1].value;
        var Mail = $("form#Appli>input")[2].value;
        var Message = $("form#Appli>input")[3].value;

        console.log(LastName);
        console.log(Mail);
        console.log(FirstName);
        console.log(Message);
        console.log(idAd1);

        axios.get('http://localhost:8080/read/people/mail/' + Mail)


            .then(function (response) {
                //On traite la suite une fois la réponse obtenue 
                IDPeople = response.data[0].idPeople
                console.log(response);

                axios.post('http://localhost:8080/create/candid', {
                    idPeople: IDPeople,
                    idAd: idAd1,
                    message: Message

                })
                    .then(function (reponse) {
                        //On traite la suite une fois la réponse obtenue 
                        console.log(reponse);
                        $(event.target.parentNode).after(
                            '<center>Demande réussie</center>'
                        );
                        $(event.target.parentNode).hide();
                    })
                    .catch(function (erreur) {
                        //On traite ici les erreurs éventuellement survenues
                        console.log(erreur);
                    })
            })

            .catch(function (erreur) {
                //On traite ici les erreurs éventuellement survenues
                console.log(erreur);
                axios.post('http://localhost:8080/create/people', {
                    lastName: LastName,
                    firstName: FirstName,
                    statut: 'applicant',
                    mail: Mail

                })
                    .then(function (reponse) {
                        axios.get('http://localhost:8080/read/people/mail/' + Mail)


                            .then(function (response) {
                                //On traite la suite une fois la réponse obtenue 
                                IDPeople = response.data[0].idPeople
                                console.log(response);

                                axios.post('http://localhost:8080/create/candid', {
                                    idPeople: IDPeople,
                                    idAd: idAd1,
                                    message: Message

                                })
                                    .then(function (reponse) {
                                        //On traite la suite une fois la réponse obtenue 
                                        console.log(reponse);
                                        $(event.target.parentNode).after(
                                            '<center>Inscription du mail + Demande réussie</center>'
                                        );
                                        $(event.target.parentNode).hide();
                                    })
                                    .catch(function (erreur) {
                                        //On traite ici les erreurs éventuellement survenues
                                        console.log(erreur);
                                    })

                            })
                            .catch(function (erreur) {
                                //On traite ici les erreurs éventuellement survenues
                                console.log(erreur);
                            })
                            .catch(function (erreur) {
                                //On traite ici les erreurs éventuellement survenues
                                console.log(erreur);
                            })
                    })
            });
    }
}

// function login
function login(event) {

    var Mail = $("form#login>input")[0].value;
    var Mdp = $("form#login>input")[1].value;

    console.log(Mail);
    console.log(Mdp);

    axios.post('http://localhost:8080/login', {
        mail: Mail,
        mdp: Mdp

    })
        .then(function (reponse) {
            //On traite la suite une fois la réponse obtenue 
            console.log(reponse);
            $('div.login-container').append(
                '<p>Connecté</p>'
            );
            $('form#login').hide();
        })
        .catch(function (erreur) {
            //On traite ici les erreurs éventuellement survenues
            console.log(erreur);
        })
};