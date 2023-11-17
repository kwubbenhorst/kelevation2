var allReturnedRecipes = JSON.parse(localStorage.getItem("recipes"));
console.log(allRecipeDetails);

/*
// Attach click event listener to the accordion container
document.querySelector('.accordion').addEventListener('click', function (event) {
  // Check if the clicked element has the class 'get'
  if (event.target.classList.contains('get')) {
    // Access the recipe id using the dataset property
    var recipeId = event.target.dataset.recipeId;
    console.log('Recipe ID:', recipeId);

    // Call the function to render the selected recipe
    renderSelectedRecipe(recipeId);

    // Hide the accordion
    var accordionContainer = document.querySelector('.accordion');
    accordionContainer.style.display = 'none';
  }
});
*/

function renderRecipeCard(recipeId) {
  // Find the recipe details from the allReturnedRecipes array based on the recipeId

  // Show the recipe card container
  var recipeCardContainer = document.querySelector('.recipe-card-container');
  recipeCardContainer.style.display = 'block';
}
}

/*
// Add click listener to the "Get" button when creating it dynamically
getButton.addEventListener('click', function() {
// Access the recipe id using the dataset property
var recipeId = this.dataset.recipeId;
console.log('Recipe ID:', recipeId);

// Call the function to render the selected recipe
renderSelectedRecipe(recipeId);

// Hide the accordion
var accordionContainer = document.querySelector('.accordion-container');
accordionContainer.style.display = 'none';
});



function renderRecipeCard(recipeId) {
// Find the recipe details from the allReturnedRecipes array based on the recipeId
var selectedRecipe = allReturnedRecipes.find(function (recipe) {
  return recipe.id === recipeId;
});


// Iterate through each returned recipe
allReturnedRecipes.forEach(function (recipe) {
  // Check if the current recipe matches the requested recipeId
  if (recipe.id === recipeId) {
    // Access the existing elements in the recipe card
    var recipeTitleEl = document.querySelector('.recipe-title');
    var servesAndTimeEl = document.querySelector('.serves-and-time');
    var dishImageEl = document.querySelector('.dish-image');
    var ingredientsListEl = document.querySelector('.ingredients-list');
    var methodStepsListEl = document.querySelector('.method-steps-list');
    var sourceLinkEl = document.querySelector('.source-link');function renderRecipeCard(recipeId) {

  //Iterate through each returned recipe
allReturnedRecipes.forEach(function(recipe) {
  // Create a div for the recipe card
  var recipeCard = document.createElement('div');
  recipeCard.className = 'recipe-card';

  // Set the title
  var titleElement = document.createElement('h1');
  titleElement.className = 'recipe-title';
  titleElement.innerHTML = '<strong>' + recipe.title + '</strong>';
  recipeCard.appendChild(titleElement);

  // Add a heart button
  var heartButton = document.createElement('button');
  heartButton.className = 'heart-btn';
  heartButton.textContent = '❤️';
  recipeCard.appendChild(heartButton);

  // Display serves and time
  var servesAndTimeElement = document.createElement('h2');
  servesAndTimeElement.className = 'serves-and-time';
  servesAndTimeElement.textContent = 'Serves: ' + recipe.servings + ', Ready in: ' + recipe.readyInMinutes + ' minutes';
  recipeCard.appendChild(servesAndTimeElement);

  // Display the dish image
  var dishImage = document.createElement('img');
  dishImage.className = 'dish-image';
  dishImage.src = recipe.image;
  recipeCard.appendChild(dishImage);

  // Display Ingredients
  var ingredientsHeader = document.createElement('h2');
  ingredientsHeader.innerHTML = '<strong>Ingredients:</strong>';
  recipeCard.appendChild(ingredientsHeader);

  var ingredientsList = document.createElement('ul');
  ingredientsList.className = 'ingredients-list';

  recipe.ingredients.forEach(function(ingredient) {
    var ingredientItem = document.createElement('li');
    ingredientItem.textContent = ingredient;
    ingredientsList.appendChild(ingredientItem);
  });

  recipeCard.appendChild(ingredientsList);

  // Display Method
  var methodHeader = document.createElement('h2');
  methodHeader.innerHTML = '<strong>Method:</strong>';
  recipeCard.appendChild(methodHeader);

  var methodStepsList = document.createElement('ul');
  methodStepsList.className = 'method-steps-list';

  recipe.steps.forEach(function(step) {
    var stepItem = document.createElement('li');
    stepItem.textContent = step;
    methodStepsList.appendChild(stepItem);
  });

  recipeCard.appendChild(methodStepsList);

  // Display Source
  var sourceElement = document.createElement('h3');
  sourceElement.className = 'source';
  var sourceLink = document.createElement('a');
  sourceLink.className = 'source-link';
  sourceLink.href = recipe.sourceUrl;
  sourceLink.textContent = 'Source';
  sourceElement.appendChild(sourceLink);
  recipeCard.appendChild(sourceElement);

  // Append the recipe card to the container
  recipeCardContainer.appendChild(recipeCard);
});

  // Find the recipe details from the allReturnedRecipes array based on the recipeId
var selectedRecipe = allReturnedRecipes.find(function(recipe) {
return recipe.id === recipeId;
});


// Check if the recipe is found
if (selectedRecipe) {
    // Access the elements in the recipe card
    var recipeTitleEl = document.querySelector('.recipe-title');
    var servesAndTimeEl = document.querySelector('.serves-and-time');
    var dishImageEl = document.querySelector('.dish-image');
    var ingredientsListEl = document.querySelector('.ingredients-list');
    var methodStepsListEl = document.querySelector('.method-steps-list');
    var sourceLinkEl = document.querySelector('.source-link');

    // Update the content of the recipe card
    recipeTitleEl.innerHTML = '<strong>' + selectedRecipe.title + '</strong>';
    servesAndTimeEl.textContent = 'Serves: ' + selectedRecipe.servings + ' | Ready in: ' + selectedRecipe.readyInMinutes + ' minutes';
    dishImageEl.src = selectedRecipe.image;
    // Update Ingredients List
    ingredientsListEl.innerHTML = ''; // Clear existing content
    selectedRecipe.ingredients.forEach(function(ingredient) {
    var ingredientItem = document.createElement('li');
    ingredientItem.textContent = ingredient;
    ingredientsListEl.appendChild(ingredientItem);
  });

  // Update Method Steps List
    methodStepsListEl.innerHTML = ''; // Clear existing content
    selectedRecipe.steps.forEach(function(step) {
    var stepItem = document.createElement('li');
    stepItem.textContent = step;
    methodStepsListEl.appendChild(stepItem);
  });

  // Update Source Link
    sourceLinkEl.href = selectedRecipe.sourceUrl;
    sourceLinkEl.textContent = 'Source: ' + selectedRecipe.sourceUrl;


   // Show the recipe card container
    recipeCardContainer.style.display = 'block';
}   
};

*/
function renderRecipeDetails(allRecipeDetails) {
  console.log("Rendering recipe details");

  // Set button visibility to hidden
        //accordionBodyEl.querySelector('.get').style.visibility = 'hidden';
    }
})();
}
/*
// Set button visibility to visible for all accordion sections
var buttons = document.querySelectorAll('.get');
for (var n = 0; n < buttons.length; n++) {
  buttons[n].style.visibility = 'visible';
}
*/

// Resolve the promise when rendering is complete
resolve();
}, 100); 

/*
// ...

// Create and append the "Get" button dynamically
var getButton = document.createElement('button');
getButton.type = 'button';
getButton.className = 'btn btn-primary get';
getButton.textContent = 'Get';

// Capture the recipe id
getButton.dataset.recipeId = recipeDetail.id;  // Assuming the property is named 'id'

// Add click listener to the "Get" button
getButton.addEventListener('click', function() {
  // Access the recipe id using the dataset property
  var recipeId = this.dataset.recipeId;
  console.log('Recipe ID:', recipeId);

  // Add your logic to handle the click event, such as fetching additional details or navigating to a new page
});

// Append the "Get" button after the pre element
accordionBodyEl.appendChild(getButton);

// ...
*/

