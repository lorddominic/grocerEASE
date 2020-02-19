let img = $('<img>')
let ingredient
let queryUrl = "https://www.themealdb.com/api/json/v2/9973533/filter.php?i=" + ingredient
let searchIcon = $('#searchButton')
let $div = ('<div>')


searchIcon.on('click', function (e) {
    let ingredient = $('.uk-search-input').val()
    let queryUrl = "https://www.themealdb.com/api/json/v2/9973533/filter.php?i=" + ingredient
    console.log(ingredient)
    $.ajax({
        method: "GET",
        url: queryUrl
    }).then(function (response) {
        $('cardContainer').empty();
        for (let i = 0; i < 5; i++) {
            
           let meal = response.meals[i].strMeal
           let mealThumb = response.meals[i].strMealThumb
           let idMeal = response.meals[i].idMeal
           let cardDiv = $("<div>").addClass('uk-card uk-card-default')
           let mediaCard = $("<div>").addClass('uk-card-media-top')
           let cardBody = $("<div>").addClass('uk-card-body')
           let imageCard = $('<img>').attr('src', mealThumb)
           let h3 = $("<h3>").text(meal)
           $('.cardContainer').append(cardDiv)
           cardDiv.append(mediaCard)
           mediaCard.append(imageCard)
           cardDiv.append(cardBody)
           cardBody.append(h3)
        }

        console.log(queryUrl)

    })

})