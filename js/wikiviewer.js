$(document).ready(function () {
    var originalResultHTML = $('#result-content').html();
    var searchLink = "https://en.wikipedia.org//w/" +
        "api.php?action=query&format=json&list=" +
        "search&callback=%3F&callback=?&srsearch=";
    var searchTerm;

    function wikiQuery(link) {
        $.getJSON(link, function (data) {
                console.log(data);
                var results = data.query.search;
                if (results.length > 0) {
                    for (var i = 0; i < 10; i++) {
                        $("#result-content").html($('#result-content').html() +
                            "<a class='result' href='https://en.wikipedia.org/wiki/" +results[i]['title']+
                            "'><div class='jumbotron'><h1 class='display-4'>" +
                            results[i]['title'] + "</h1><hr class=\"my-4\"><p class=\"lead\">" +
                            results[i]['snippet'] + "</p></div></a>")
                    }
                } else {
                    $("#result-content").html("<div class='jumbotron'><h1 class='display-4'>Uh oh, we couldn't" +
                        " find what you were looking for. Please make another search.</h1></div>")
                }
                $("#result-content").fadeIn('slow');
            $('#input-search-new').val(searchTerm);
                $('#input-search-new').focus();
            }
        )
    };
    $("#search-content-wrapper").css('display', 'flex').hide().fadeIn('slow', function () {
        $("#input-search-main").focus();
    });
    $("#input-search-main").keyup(function (event) {
        if (event.keyCode === 13 && $('#input-search-main').val().length) {
            $('#btn-search-main').click();
        }
    });
    $("#btn-search-main").click(function () {
        if ($('#input-search-main').val().length) {
            searchTerm = $('#input-search-main').val();
            $("#search-content-wrapper").fadeOut('slow', function () {
                $("#result-content-wrapper").fadeIn('slow');
            });
            wikiQuery(searchLink + searchTerm);
        }
    });
    $(document).on('keyup', '#input-search-new', function (event) {
        if (event.keyCode === 13 && $('#input-search-new').val().length) {
            $("#btn-search-result").click();
        }
    });
    $(document).on('click', '#btn-search-result', function () {
        if($('#input-search-new').val().length){
            searchTerm = $('#input-search-new').val();
            $("#result-content").fadeOut('slow', function () {
                $("#result-content").html(originalResultHTML);
                wikiQuery(searchLink + searchTerm);
            });
        }
    });
})
