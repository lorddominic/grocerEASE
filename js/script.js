

let img = $('<img>')
let ingredient
let queryUrl = "https://www.themealdb.com/api/json/v2/9973533/filter.php?i=" + ingredient
let searchIcon = $('#searchButton')
let $div = ('<div>')
var ing = []
var meas = []
var recipes = []

$('.multiple-items').on('click', function (e) {

    var target = $(event.target).attr("data-id")
    recipes.push(target);
    console.log(recipes);
})

$("#recipe-form").on("submit", function (event) {
    event.preventDefault();
    console.log("search enter hit")

    let ingredient = $("#search-input").val().trim();
    console.log(ingredient);


    ingredientSearch(ingredient);


});

searchIcon.on('click', function () {
    let ingredient = $('.uk-search-input').val().trim();

    ingredientSearch(ingredient);

});



function ingredientSearch(ingredient) {
    console.log("ingredientSearch running");
    // let ingredient = $('.uk-search-input').val()
    let queryUrl = "https://www.themealdb.com/api/json/v2/9973533/filter.php?i=" + ingredient
    // console.log(ingredient)
    $.ajax({
        method: "GET",
        url: queryUrl
    }).then(function (response) {



        $('.multiple-items').empty()



        for (let i = 0; i < 5; i++) {


            let meal = response.meals[i].strMeal
            let mealThumb = response.meals[i].strMealThumb
            let idMeal = response.meals[i].idMeal
            let imageCard = $('<img>').attr('src', mealThumb).attr('data-id', idMeal)

            var sliderItem = $('<div>').append(imageCard)
            $('.multiple-items').append(sliderItem)





            queryUrl2 = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + idMeal
            console.log(queryUrl2)

        }

        $.ajax({
            method: "GET",
            url: queryUrl2
        }).then(function (response2) {
            console.log(response2);
            for (let i = 1; i < 20; i++) {
                if (response2.meals[0]['strIngredient' + i] != null) {
                    ing.push(response2.meals[0]['strIngredient' + i])
                    meas.push(response2.meals[0]['strMeasure' + i])
                    console.log(ing)
                    console.log(meas)
                }

            }



        })

        $('.multiple-items').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false,
        });

    });

}

