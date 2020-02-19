let img = $('<img>')
let ingredient
let queryUrl = "https://www.themealdb.com/api/json/v2/9973533/filter.php?i=" + ingredient
let searchIcon = $('#searchButton')
let $div = ('<div>')
var ing = []
var meas = []

searchIcon.on('click', function (e) {
    let ingredient = $('.uk-search-input').val()
    let queryUrl = "https://www.themealdb.com/api/json/v2/9973533/filter.php?i=" + ingredient
    console.log(ingredient)
    $.ajax({
        method: "GET",
        url: queryUrl
    }).then(function (response) {
        $('.cardContainer').empty()

        

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
           queryUrl2 = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + idMeal
           console.log(queryUrl2)
          
        }
        $.ajax({
            method: "GET",
            url: queryUrl2
        }).then(function (response2) {
                console.log(response2);
               for(let i = 1; i < 20; i++){
               if(response2.meals[0]['strIngredient' + i] != null){
                ing.push(response2.meals[0]['strIngredient' + i])
                meas.push(response2.meals[0]['strMeasure' + i])
                console.log(ing)
                console.log(meas)
               }
                
               }
               
            

        })


    })

})