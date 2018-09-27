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
//Running at start of page
    createButton();

})