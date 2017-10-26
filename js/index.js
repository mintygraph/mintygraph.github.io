$(document).ready(function () {
    $("#home").click(function () {
        $("html, body").animate({ scrollTop: $("#jumbotron").offset().top }, 2000);
    });
    $("#myskills").click(function () {
        $("html, body").animate(
            { scrollTop: $("#myskillcontent").offset().top },
            2000
        );
    });
    $("#portfolio").click(function () {
        $("html, body").animate(
            { scrollTop: $("#portfoliocontent").offset().top },
            2000
        );
    });
    $("#currently").click(function () {
        $("html, body").animate(
            { scrollTop: $("#currentlycontent").offset().top },
            2000
        );
    });
    $("#bannertext").fadeIn('slow');
    $(window).on("scroll",function(e){
       if($(window).scrollTop() > 50){
           $("#navbar").addClass('active');
       } else{
           $("#navbar").removeClass('active');
       }
    });
});