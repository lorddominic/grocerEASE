let img = $('<img>')
let ingredient
let queryUrl = "https://www.themealdb.com/api/json/v2/9973533/filter.php?i=" + ingredient
let searchIcon = $('#searchButton')
let $div = ('<div>')
var ing = []
var meas = []
var recipes = []
var searchHistory = [];
var ing = []
var meas = []
var ingmeas = []
var newMeas = []



$("#home").on('click', function () {
    ingredientSearch("holyshit");
})

function getHistory() {
    $(".historyli").empty();
    var parseHistory = JSON.parse(localStorage.getItem("history"));
    parseHistory.forEach(element => {
        var li = $("<li>").text(element)
        $(".historyli").append(li);
    })
}

$('#generateShop').on('click', function (e) {
    $('.ingredientsContainer').append("<h3 class='uk-text-center uk-padding'>" + 'Your combined shopping list:' + '</h3>' + '<hr>')
    for (let i = 0; i < recipes.length; i++) {
        var ingredientsUrl = "https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + recipes[i]
        console.log(ingredientsUrl)

        $.ajax({
            method: "GET",
            url: ingredientsUrl
        }).then(function (response2) {
            for (let i = 1; i < 20; i++) {
                if (response2.meals[0]['strIngredient' + i] != '') {
                    ing.push(response2.meals[0]['strIngredient' + i])
                    meas.push(response2.meals[0]['strMeasure' + i])
                    ingmeas.push([response2.meals[0]['strIngredient' + i], response2.meals[0]['strMeasure' + i]])
                    ingmeas = ingmeas.sort()
                    
                    
                    


                }
               
               
                
            }
            
    
        })      
        
    }
 
     var promise = new Promise((resolve, reject) => {
        setTimeout(() => {  
            resolve() 
        }, 2000);
        
    setTimeout(() => {
        
        stuffToDo(ingmeas)
        console.log(newMeas)
        uniqueMeas = new Set(newMeas)
        console.log(uniqueMeas)
        
        
        
    }, 2100); 
        
    
    })
  
})




function stuffToDo(ingmeas) {
    for (let i = 0; i < ingmeas.length; i++) {
        
        
   
    if (ingmeas.length > 0) {
       
        
        if (ingmeas[0][0] === ingmeas[1][0]) {
            ingmeas[0].push(ingmeas[1][1])
            newMeas.push(ingmeas[0])
            ingmeas.splice(1,1)
            
        }

        // else if(ingmeas[0][0] === ingmeas[1][0] && newMeas[i + 1][0] === ingmeas[0][0]){
        //     ingmeas[0].push(ingmeas[1][1])
        //     newMeas.push(ingmeas[0])
        //     ingmeas.shift()
        //     ingmeas.shift()
            
        // }

        else {
            newMeas.push(ingmeas[0])
            ingmeas.shift()
           
        }
    }
    }
}







$('.multiple-items').on('click', function (e) {


    recipes.push(($(event.target).attr('data-id')))


    //   $(event.target).addClass('uk-invisible')
    $('.underTitle').append(($(event.target)).parent())
    //   $('.underTitle').append(($(event.target)))

    $('.underTitle').children().attr('style', '')
    $('.underTitle').children().addClass('fart')




})

$("#recipe-form").on("submit", function (event) {
    event.preventDefault();


    let ingredient = $("#search-input").val().trim();


    ingredientSearch(ingredient);
    event.preventDefault();

    searchHistory.push(ingredient);
    localStorage.setItem("history", JSON.stringify(searchHistory));
    getHistory();
});


searchIcon.on('click', function () {
    let ingredient = $('.uk-search-input').val().trim();


    ingredientSearch(ingredient);
    event.preventDefault();

    searchHistory.push(ingredient);
    localStorage.setItem("history", JSON.stringify(searchHistory));
    getHistory();
});

function ingredientSearch(ingredient) {

    // let ingredient = $('.uk-search-input').val()
    let queryUrl = "https://www.themealdb.com/api/json/v2/9973533/filter.php?i=" + ingredient

    $.ajax({
        method: "GET",
        url: queryUrl
    }).then(function (response) {
        $('.multiple-items').empty()
        for (let i = 0; i < 5; i++) {




            let meal = response.meals[i].strMeal
            let mealThumb = response.meals[i].strMealThumb
            let idMeal = response.meals[i].idMeal
            let imageCard = $('<img>').attr('src', mealThumb).attr('data-id', idMeal).addClass('recipeImage')

            var sliderItem = $('<div>').append(imageCard)
            var sliderText = sliderItem.append('<p>' + meal + '</p>')
            sliderText.addClass('uk-text-center uk-text-bold uk-text-large')
            $('.multiple-items').append(sliderItem)

        }



        $('.multiple-items').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false,
        });


    });

}


