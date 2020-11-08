$("p.hidden").hide();
$(".myBtn").click(myFunction);

function myFunction(event) {

    if ($(event.target.parentNode.childNodes[3]).is(":visible")) {
        $(event.target.parentNode.childNodes[3]).hide();
    } else {
        $(event.target.parentNode.childNodes[3]).show();
    }
}