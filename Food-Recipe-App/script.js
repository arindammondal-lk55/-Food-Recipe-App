/*The code starts by selecting various elements from the HTML document using their IDs and classes.
Event listeners are added to the search button, meal list, and recipe close button 
to handle user interactions.*/
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients

/*The getMealList function is responsible for fetching meal data from an external API 
based on the user's ingredient input. Here's what it does:

1) It retrieves the value entered in the search input field.
2) It performs a fetch request to the "themealdb.com" API, providing the ingredient as a parameter.
3) The response is converted to JSON format.
4) If the response contains meal data (meals array is not empty), 
it iterates over each meal and generates HTML markup to display the meal's name and thumbnail.
5) If no meals are found, it displays a "Sorry" message.
6) The generated HTML is then inserted into the meal list element. */
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
/* The getMealRecipe function is triggered when a user clicks the 
"Get Recipe" link for a specific meal. Here's what it does:

1) It prevents the default behavior of the anchor tag.
2) It retrieves the meal ID from the clicked meal item's dataset attribute.
3) It performs a fetch request to the API, providing the meal ID as a parameter.
4) The response is converted to JSON format.
5) The mealRecipeModal function is called with the meal data as an argument.*/
function getMealRecipe(e){
    e.preventDefault();
    /*e is the event object that is passed as an argument to the event handler function 
    getMealRecipe.
    e.target refers to the element that triggered the event, i.e., the element that was clicked.
    classList is a property of an element that represents a collection of CSS classes 
    applied to the element.
    contains('recipe-btn') is a method of the classList property that checks 
    if the element has the CSS class "recipe-btn" applied to it.
    So, the if statement is used to determine whether the clicked element has 
    the CSS class "recipe-btn" applied to it. If the condition is true, 
    it means that the clicked element is the "Get Recipe" link associated with 
    a specific meal in the meal list. In that case, 
    the subsequent code inside the if block is executed, 
    which includes fetching the meal details and displaying them in the modal. */
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal

/* The mealRecipeModal function is responsible for generating a modal 
to display the details of a specific meal. Here's what it does:

1) It receives the meal data as a parameter.
2) It retrieves the necessary information from the meal object and generates 
   HTML markup for the meal's title, category, instructions, thumbnail, 
   and a link to a recipe video.
3) The generated HTML is inserted into the meal details content element.
4) It adds the "showRecipe" class to the parent element of the meal details content,
  which triggers the display of the modal.*/
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    /*The statement `mealDetailsContent.parentElement.classList.add('showRecipe');` 
    adds the CSS class "showRecipe" to the parent element of `mealDetailsContent`. 
    In the provided HTML code, `mealDetailsContent` represents the container for the 
    meal details content within the modal. The `parentElement` property retrieves the 
    immediate parent element of `mealDetailsContent`, 
    which is the element that contains the entire modal.
    By adding the "showRecipe" class to the parent element, 
    the statement modifies the CSS classes applied to that element. 
    This class likely has associated CSS styles that control the visibility or 
    appearance of the modal. 
    In the context of the code, adding the "showRecipe" class to the parent element 
    is intended to show the modal on the screen, making it visible to the user. 
    The CSS rules associated with the "showRecipe" class might include properties 
    like `display: block;` or `visibility: visible;` to make the modal appear on the page. */
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
/* In summary, this JavaScript code enables the user to search for meals based on ingredients, 
retrieve a list of matching meals, and view the details of a selected meal 
in a modal window. The meal data is fetched from an external API (themealdb.com) 
and dynamically rendered on the web page.*/