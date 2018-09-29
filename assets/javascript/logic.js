$(document).ready(function () {
    //Variables
    var searchArr = ["Cat", "Dog", "Capybara"]

    // functions

    function displaySearchResults() {

        var searchTerm = $(this).attr("data-term");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=lFcQEt5ObDcHepF5gLDKKcMjvMEI7GOD&q=" + searchTerm + "&limit=10&offset=0&rating=PG&lang=en";
        $.ajax({
            url: queryURL,
            method: "get"
        }).then(function (response) {
            console.log(queryURL);
            console.log(response);
            var results = response.data
            for (i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("makeTheseFlex")
                var rating = $("<p>").text("Rating: " + results[i].rating);
                var animalGif = $("<img>");
                animalGif.attr("src", results[i].images.fixed_height_small.url);
                animalGif.attr("data-still",results[i].images.fixed_height_small_still.url);
                animalGif.attr("data-animate", results[i].images.fixed_height_small.url);
                animalGif.attr("data-state", "still");
                animalGif.addClass("gifs")
                gifDiv.append(rating);
                gifDiv.append(animalGif);
                $("#gifView").prepend(gifDiv);
            }
        })
    }

    function createButton() {
        $("#buttonArea").empty();
        for (var i = 0; i < searchArr.length; i++) {
            var topicButton = $("<button>");
            topicButton.addClass("term");
            topicButton.attr("data-term", searchArr[i]);
            topicButton.text(searchArr[i]);
            $("#buttonArea").append(topicButton);
        }
    }
//On click events
    $("#searchButton").on("click", function (event) {
        event.preventDefault();
        var searchTerm = $("#addTerm").val().trim();
        searchArr.push(searchTerm);
        console.log(searchArr);
        createButton();

    })

    $(document).on("click", ".term", displaySearchResults);
    //This section represents my attempt at pausing the gifs. For the life of me I can't seem to make it work. 
    //I think it has something to do with the AJAX call loading after this on click event is registered
    //For now I've reset the default load on the ajax call to be an animated gif to make the app as a whole more functional. 
    // $(".gifs").on("click", function() {
    //     var state = $(this).attr("data-state");
    //     if (state === "still") {
    //       $(this).attr("src", $(this).attr("data-animate"));
    //       $(this).attr("data-state", "animate");
    //     } else {
    //       $(this).attr("src", $(this).attr("data-still"));
    //       $(this).attr("data-state", "still");
    //     }
    // });
//Running at start of page
    createButton();

})