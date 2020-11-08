axios.get('http://localhost:8080/read/ads').then(response => {

    for (let i = 0; i < response.data.length; i++) {

        $('.pub').append(
            '<div class="annonce">' +
            '<h2>' + response.data[i].titre + '</h2>' +
            '<p class="hidden">' + response.data[i].contenu +
            '<br>' +
            '<button class="appli" onclick="window.location.href=`./applic.html`;"> Appli</button >' +
            '</p > ' +
            '<button class="myBtn">Learn more</button>' +
            '</div>'
        );
        // $('.annonce>p').addClass('hidden');
    }
    $("p.hidden").hide();
    $(".myBtn").click(myFunction);

})




function myFunction(event) {

    if ($(event.target.parentNode.childNodes[1]).is(":visible")) {
        $(event.target.parentNode.childNodes[1]).hide();
    } else {
        $(event.target.parentNode.childNodes[1]).show();
    }
}

// $("#SubBtn").click(
//     axios.post('/create/people', {
//         lastName: 'Finn',
//         firstName: 'Williams'
//     })
//         .then(function (reponse) {
//             //On traite la suite une fois la réponse obtenue 
//             console.log(reponse);
//         })
//         .catch(function (erreur) {
//             //On traite ici les erreurs éventuellement survenues
//             console.log(erreur);
//         }));