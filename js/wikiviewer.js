//TODO
//Add new function to get the value of the searchinputbox
$(document).ready(function () {
    function getSearchInput(){
        return $('.search-input').val();
    }
    var originalResultHTML = $('#result-content-wrapper').html();
    $("#search-content-wrapper").css('display', 'flex').hide().fadeIn('slow', function () {
        $(".search-input").focus();
    });
    $(".search-input").keyup(function (event) {
        if (event.keyCode === 13 && $('.search-input').val() != "") {
            $('#btn-search-main').click();
        }
    });
    $("#btn-search-main").click(function () {
        var searchTerm = $('.search-input').prop('value');
        if (searchTerm != "") {
            $("#search-content-wrapper").fadeOut('slow');
            $.getJSON("https://en.wikipedia.org//w/" +
                "api.php?action=query&format=json&list=" +
                "search&callback=%3F&callback=?&srsearch=" + searchTerm, function (data) {
                    var results = data.query.search;
                    for (var i = 0; i < 10; i++) {
                       $("#result-content-wrapper").html($('#result-content-wrapper').html()+
                           "<div class='jumbotron'><h1 class='display-4'>"+
                           results[i]['title']+
                           "</h1><hr class=\"my-4\"><p class=\"lead\">"+
                           results[i]['snippet']+ "</p></div>")
                    }
                    $("#result-content-wrapper").fadeIn('slow');
                }
            )
        }
    });
    $(document).on('keyup','.search-input',function(event){
        if (event.keyCode === 13 && $('.search-input').val() != "") {
            $("#btn-search-result").click();
        }
    });
    $(document).on('click','#btn-search-result',function(){
        $("#result-content-wrapper").html(originalResultHTML);
        var ech = getSearchInput();

        if (ech != ""){
            console.log(ech);
        }
    });
})
