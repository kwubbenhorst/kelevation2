var apiKeySpnclr = "0d496145a03e4cdfb825d930b3633556";
document.addEventListener("DOMContentLoaded", function() {
    //Karla's apiKey stored in a variable, and a variable dishName created to capture user input from the input box on the search page.  It is just set to "Maple Glazed Salmon" as a default for now so I can test this code. Button element created in search.html and stored in a variable here so I can listen for clicks on it 
  var input1 = document.querySelector(".input-1");
  var searchBtn1El = document.querySelector(".btn-landing-page");
  var allReturnedRecipes = [];
  var allRecipeDetails = [];
  
 
function handleSearchButtonClick1(giraffe) {
    console.log('Button 1 clicked');
    console.log("input1 value:", giraffe);
    // Using a promise to wait for getRecipes to complete
    return new Promise(function(resolve) {
        getRecipes(resolve, giraffe, false); // Pass the input1 value to getRecipes
    }).then(function () {
        //Navigates to menus.html after searching
        window.location.href = '../library/menus.html';
    });
}


// Added event listener to the search button on search.html
if (searchBtn1El) {
    console.log('after element selection, searchBtn1El:', searchBtn1El);
    searchBtn1El.addEventListener("click", function() {
        var giraffe = input1.value;
        console.log("when button 1 is clicked:", input1.value);        // Execute handleSearchButtonClick1 and navigate to menus.html after completion
        handleSearchButtonClick1(giraffe).then(function() {
            console.log('After getRecipes function call');

// Adding a setTimeout for additional delay before navigating to menus.html so console log messages can be read
setTimeout(function() {
    window.location.href = '../library/menus.html';
}, 20000); 
});
});
} else {
console.log('Element with class "btn-landing-page" not found in the current page.');
}

//Check for presence of menus.html specific elements
if (window.location.href.includes('menus.html')) {
    var input2 = document.querySelector(".input-2");
    var searchBtn2El = document.querySelector(".btn-menus-page");

    function handleSearchButtonClick2() {
        console.log('Button 2 clicked');
        getRecipes(function () {
            // Delay the page replacement for 20 seconds (20000 milliseconds) for testing
            setTimeout(function () {
                window.location.href = "../library/results.html";
            }, 20000); 
        }, input2.value, false); //Pass the input2 value to getRecipes
    }

// Added event listener to the search button on menus.html
if (searchBtn2El) {
    console.log('after element selection, searchBtn2El:', searchBtn2El);
    searchBtn2El.addEventListener("click", handleSearchButtonClick2);
} else {
    console.log('Element with class "btn-menus-page" not found in the current page.');
}
}

console.log('after adding event listeners');
});

//Function to getRecipes that will be called as an event handler function when search buttons on p. 1 or 2 is hit. The parameter is a flag which is false by default but will be set to true when the function is called in response to a click on searchBtn2El. This will invoke some comparative logic within the function which will be bypassed in the case the search initiated from p. 1
function getRecipes(resolve, ingredientOrDish1, ingredientOrDish2, compareResults) { 
    // Captures the input associated with the click event
    //var ingredientOrDish1 = input1.value;
    //var ingredientOrDish2 = input2.value;
    console.log(ingredientOrDish1);
    console.log(ingredientOrDish2); 
    // A fetch URL to get recipes from spoonacular api. Query parameters are hardcoded to limit recipes returned to 5, to sort by most popular and display them in descending order. Data will include full recipe instructions and nutritional info
    var recipesURL1 = `https://api.spoonacular.com/recipes/complexSearch?query=${ingredientOrDish1}&addRecipeNutrition=true&instructionsRequired=true&sort=popularity&sortDirection=desc&number=5&apiKey=${apiKeySpnclr}`;
    var recipesURL2 = `https://api.spoonacular.com/recipes/complexSearch?query=${ingredientOrDish2}&addRecipeNutrition=true&instructionsRequired=true&sort=popularity&sortDirection=desc&number=5&apiKey=${apiKeySpnclr}`;
    
    //Declares the recipe and recipeDetails variables and sets them initially to an empty array. Eventually I will push as many iterations of the returnedRecipeObject and the recipeDetailsObject in here as are returned from the fetch request, so I am using them to store the search results, restructured for renderability
    var allReturnedRecipes1 = [];
    var allReturnedRecipes2 = [];
    var allRecipeDetails1 = [];
    var allRecipeDetails2 = [];
  
    //These variables have a role to play in the conditional logic when we have the results from two searches to compare. SuggestionsOnly will be passed as a flag to the renderSearchResults function an informs what message is sent in the modal
    var searchesSame = false;
    var secondSearchSuccess = false;
    var suggestionsOnly = false;
    var stillInterested = false;
  
    //NESTED FUNCTION PROCESSRECIPES WHICH STRUCTURES THE DATA TO PASS INTO THE RENDERING FUNCTIONS
  
    //This function processes each recipe from the fetched data and constructs the allReturnedRecipes array and the allRecipeDetails array accordingly
    function processRecipes(data, allReturnedRecipes, allRecipeDetails) {
      if (data.results && data.results.length > 0) {
        console.log(data.results); //Checks that indeed some data has been returned and logs it all out in the console
  
        for (var i = 0; i < data.results.length; i++) {
          var recipeData = data.results[i]; //lets me deal with each returned recipe's data separately
        
  
  // Extracts the ingredients values and formats them.
  var ingredientsVal = [];
  for (var j = 0; j < recipeData.nutrition.ingredients.length; j++) {
    var ingredient = recipeData.nutrition.ingredients[j];
    var formattedIngredient = '';
      //Ingredients are under the nutrients array in the data.results. Amounts are given here per serving so this multiplies by the servings value to get the right amount for the whole recipe.
      var adjustedAmount = ingredient.amount * recipeData.servings;
      // This logic evaluates whether the adjusted amount is a whole number. If so, it updates the value of the formattedIngredients string. If not, it rounds to one decimal place before updating the value of the formattedIngredients string.
      if (adjustedAmount % 1 === 0) {
        formattedIngredient += adjustedAmount;
      } else {
        formattedIngredient += adjustedAmount.toFixed(1);
      }
      formattedIngredient += ' ' + ingredient.unit + ' ' + ingredient.name;
      ingredientsVal.push(formattedIngredient);
    }
  // Checks that the ingredients value has been extracted and formatted correctly. Should be an array that looks like this: [["28 ounces canned tomatoes", "14 ounces canned tomatoes", "2 tablespoons chili powder," "1 tablespoon ground cumin", "2 teaspoons paprika", "1 tablespoon brown sugar", "1 tablespoon brown sugar", " "0.5 teaspoon salt", "3 " carrots", "4 stalks celery", "1 medium onion", "2 cloves garlic", "1 pound beef chuck", "15 ounces kidney beans"]
  console.log('Ingredients:', ingredientsVal);
  
  
  //Extracts the steps value and formats it
  var stepsVal = [];
  if (recipeData.analyzedInstructions[0] && recipeData.analyzedInstructions[0].steps) {
  var stepArray = recipeData.analyzedInstructions[0].steps;
  for (var k = 0; k < stepArray.length; k++) {
    stepsVal.push(stepArray[k].number + '. ' + stepArray[k].step);
  }
  }
  //Checks that the steps value has been extracted and is formatted correctly. Should be an array that looks like this: ["1. In a medium bowl, stir together the crushed tomato…cumin, paprika, brown sugar, and salt. Set aside.", "2. Place the carrots, celery, onions, garlic, beef, and kidney beans into the base of a slow cooker.", "3. Pour the tomato sauce mixture evenly over the top …d vegetables. Cover and cook on high for 6 hours.", "4. Taste and adjust seasoning as necessary- adding more chili powder if you'd prefer more spice."]
  console.log('Steps:', stepsVal);
  
  
  //Compiles nutritional info by extracting and formatting select data from the data.results nutrients array
  var nutritionalInfoVal = [];
  //Access the nutrientsArray from the data.results and filter it to include only select nutrients
  var nutrientsArray = recipeData.nutrition.nutrients;
  var selectNutrients = nutrientsArray.filter(function(nutrient) { // the filter method's callback function goes through each nutrient in the nutrients array to see if the relevantNutrients array includes it. If true that result is returned to the array of selectNutrients
  var relevantNutrients = ['Calories', 'Fat', 'Carbohydrates', 'Sodium', 'Protein'];
  return relevantNutrients.includes(nutrient.name);
  });
  // Iterates through the selectNutrients array to extract and format the nutritional information values
  for (var m = 0; m < selectNutrients.length; m++) {
    var nutrient = selectNutrients[m];
    // Formats the nutritional information string and pushes it into the nutritionalInfoVal array
    var formattedNutritionalInfo = nutrient.name + ': ' + nutrient.amount + ' ' + nutrient.unit;
      nutritionalInfoVal.push(formattedNutritionalInfo);
  }  
  // Checks that the select nutritional info values have been extracted and formatted correctly.  Should be an array that looks like this: ["Calories: 333.47 kcal", "Fat: 6.51 g", "Carbohydrates: 44.14 g", "Sodium: 932.81 mg",  "Protein: 29.41 g"]
  console.log('Nutritional Info:', nutritionalInfoVal);
  
  
  //Creates an object to store easily renderable information for each recipe returned by the fetch request
  var returnedRecipeObject = {
    id: recipeData.id,
    title: recipeData.title,
    servings: recipeData.servings,
    readyInMinutes: recipeData.readyInMinutes,
    image: recipeData.image, // value will be an http link to the spoonacular site with a jpg extension
    ingredients: ingredientsVal,
    steps: stepsVal, 
    sourceUrl: recipeData.sourceUrl,
  };
    
  //Creates an object to store more recipe details
  var recipeDetailsObject = {
    id: recipeData.id,
    title: recipeData.title,
    image: recipeData.image,
    aggregateLikes: recipeData.aggregateLikes, //value will be a number
    cheap: recipeData.cheap, //value will be a boolean
    veryHealthy: recipeData.veryHealthy, //value will be a boolean
    cuisines: recipeData.cuisines || [], //sometimes cuisines and weightPerServing are undefined, so in this case they will default to an empty array
    weightPerServing: recipeData.weightPerServing || [], 
    diets: recipeData.diets, // value will be an array of strings
    nutritionalInfo: nutritionalInfoVal,  
  }
  
  //Pushes the returnedRecipeObject into the allReturnedRecipes array and checks in the console that its property/value pairs look as expected.
  allReturnedRecipes.push(returnedRecipeObject);
  console.log('Recipe added:', allReturnedRecipes);
  //Pushes the recipeDetailsObject into the allRecipeDetails array and checks in the console that its property/value pairs look as expected.
  allRecipeDetails.push(recipeDetailsObject);
  console.log('Recipe details added:', allRecipeDetails);
  }
  }}
  
  
  //END OF NESTED FUNCTION PROCESSRECIPES WHICH STRUCTURES THE DATA, GETTING IT READY TO PASS INTO THE NEXT FUNCTION FOR RENDERING
  
      
      //Fetch requests are wrapped in Promise.all so that the program waits for both p 1 and p 2 search results to be in before proceeding with the logic which compares them.
  Promise.all([fetch(recipesURL1)
        .then(function (response) {
            return response.json();
        })
        //Although I am writing this in the code here, it is not executed until both responses are back and the then block of promises.all is invoked.
        .then(function (data) {
            processRecipes(data, allReturnedRecipes1, allRecipeDetails1);
        })
        .catch(function (error) {
            console.error('Error fetching recipes for ingredientOrDish1:', error);
            displayModal('Aw Sorry!', 'We found no restaurant menu items with that search term. Do you have a misspelling? Is there another more common name for the ingredient you are searching Eg. "chick peas" vs. "garbanzo beans." When in doubt try shorter, simpler names for dishes Eg. "beef and port" vs. "beef tenderloin in rosemary port wine reduction".');
        }),
  
    fetch(recipesURL2)
        .then(function (response) {
            return response.json();
        })
        //Although I am writing this in the code here, it is not executed until both responses are back and the then block of promises.all is invoked.
        .then(function (data) {
            processRecipes(data, allReturnedRecipes2, allRecipeDetails2);
        })
        .catch(function (error) {
            console.error('Error fetching recipes for ingredientOrDish2:', error);
            displayModal('Aw Sorry!', 'We found no recipes with that search term. Try something simpler (two terms max.  Eg. "halibut and ginger" versus "halibut with citrus and ginger"). You can also navigate back to the previous page (use the button at the top left) and start your search again');
        })
  ])
  //Now the promises all is resolved (both responses are back) and both then blocks of the fetch requests written above are executed. After this line I should have two structured arrays of objects, allReturnedRecipes and allRecipeDetails for both the first and the second search.  
    .then(function () {
  
  //ARRANGING THE RESULTS OF MY TWO SEARCHES USING CONDITIONAL LOGIC
  
      //Extracts individual words from the first user input, excluding certain words, then checks whether ANY of the words in the first input are contained in the second. I want to see if the second search is a refinement of the first (eg. halibut --> halibut and ginger) in which case searchesSame will be true, or whether the user has used the second search box to enter a new search altogether eg. "halibut" --> "sweet potato and coconut" sets searchesSame to false
  var words1 = ingredientOrDish1.toLowerCase().split(' ').filter(function(word) {
    return !["and", "in", "with"].includes(word);
  });
  var searchesSame = words1.some(function(word) {
    return ingredientOrDish2.toLowerCase().includes(word);
  });
  
  //Checks if the second search has returned any results and sets value to true if so
  secondSearchSuccess = allReturnedRecipes2.length > 0;
  //If there are results from the second search and if the second search is a refinement of the first (eg. halibut --> halibut and ginger vs halibut --> sweet potato and coconut)
  if (secondSearchSuccess && searchesSame) {
  //Remove duplicates from allReturnedRecipes1  
    allReturnedRecipes1 = allReturnedRecipes1.filter(function (recipe1) {
      // Check if the recipe from allReturnedRecipes1 is not in allReturnedRecipes2
      return !allReturnedRecipes2.some(function (recipe2) {
        return recipe1.id === recipe2.id;
      });
    });
  
  //If there are results from the second search whether the second search is a refinement of the first or not
  if (secondSearchSuccess) {
    //Store the content of allReturnedRecipes2 in a variable with a new name, recipeMatchesArray
    var recipeMatchesArray = allReturnedRecipes2;
    //And adjust the length of the allReturnedRecipes1 array to the difference between 5 and the length of the recipeMatchesArray. Basically I want to end up with a total of five objects between these two arrays, and I want to know which are the matches for the dish-recipe requested by the second search, and which are the more general returns from the first search which I can suggest when exact matches are exhausted or not available. 
    var suggestedRecipesArray = allReturnedRecipes1.slice(0, 5 - recipeMatchesArray.length);
  } else if (secondSearchSuccess === false && searchesSame === true) { //ie. if the second search has returned no results and the second search is a refinement of the first
    recipeMatchesArray = [];
    suggestedRecipesArray = allReturnedRecipes1;
    suggestionsOnly = true  //a flag to pass to the next function and inform the modal message on p. 3  
  } else {  //searchesSame === false whether or not secondSearchSuccess === true ie. if the second search is a new departure (not halibut --> halibut and ginger but halibut --> sweet potato and coconut)
    stillInterested = true;
  
  //Ensures that the two arrays for recipes correspond to the two arrays for recipe details. Recipe id is used to make sure the recipe objects are arranged within each array in identical order.
  var detailsForRecipeMatchesArray = allRecipeDetails2;
  var detailsForSuggestedRecipesArray = allRecipeDetails1;
  
  // Check if there are recipe matches
  if (recipeMatchesArray.length > 0) {
    // Filter details for recipeMatchesArray
    detailsForRecipeMatchesArray = allRecipeDetails2.filter(function (details) {
      return recipeMatchesArray.some(function (recipe) {
        return recipe.id === details.id;
      });
    });
  }
  
  // Check if there are suggested recipes
  if (suggestedRecipesArray.length > 0) {
    // Filter details for suggestedRecipesArray
    detailsForSuggestedRecipesArray = allRecipeDetails1.filter(function (details) {
      return suggestedRecipesArray.some(function (recipe) {
        return recipe.id === details.id;
      });
    });
  }
  
  //Call the function which will render the recipeResultsListAccordion on page 3 (results.html) 
      renderRecipeResultsListAccordion(detailsForRecipeMatchesArray, detailsForSuggestedRecipesArray, suggestionsOnly, stillInterested);
  
  }
  }})  

.catch(function (error) {
  console.error('Error fetching recipes:', error);
});
}

  
  function renderRecipeResultsListAccordion(detailsForRecipeMatchesArray, detailsForSuggestedRecipesArray, suggestionsOnly, stillInterested) {
    function updateAccordionItem(accordionItem, recipeDetails, index) {
      var accordionButton = accordionItem.querySelector('.accordion-button');
      accordionButton.innerHTML = '<span class="star">&#9733;</span> Recipe Result #' + (index + 1) + ' <span class="star">&#9733;</span>';
  
      var accordionBody = accordionItem.querySelector('.accordion-body');
      accordionBody.innerHTML = '<img src="' + recipeDetails.image + '" alt="' + recipeDetails.title + '" class="accordion-image">' +
        '<strong>' + recipeDetails.title + '</strong><br>' +
        '<p>' + recipeDetails.servings + ' servings | ' + recipeDetails.readyInMinutes + ' minutes</p>' +
        '<ul>' + recipeDetails.ingredients.map(function (ingredient) {
          return '<li>' + ingredient + '</li>';
        }).join('') + '</ul>' +
        '<p>' + recipeDetails.steps.join('<br>') + '</p>' +
        '<p>Nutritional Info: ' + recipeDetails.nutritionalInfo.join(', ') + '</p>' +
        '<button type="button" class="btn btn-primary">Get</button>';
    }
  
    function clearAccordionContent() {
      var accordionItems = document.querySelectorAll('.accordion-item');
      for (var i = 0; i < accordionItems.length; i++) {
        accordionItems[i].remove();
      }
    }
  
    clearAccordionContent();
  
    var recipesToRender = suggestionsOnly ? detailsForSuggestedRecipesArray : detailsForRecipeMatchesArray;
  
    var accordionItems = document.querySelectorAll('.accordion-item');
    for (var i = 0; i < recipesToRender.length; i++) {
      var recipeDetails = recipesToRender[i];
      var accordionItem = accordionItems[i];
      if (accordionItem) {
        updateAccordionItem(accordionItem, recipeDetails, i);
      }
    }
  
    if (recipesToRender.length === 0 && stillInterested) {
      // Handle case where there are no matches or suggestions but the user is still interested
    }
  }   
  
  //Nick takes over coding from here.  I have done the pseudocode
  
  //function renderRecipeCards(allReturnedRecipes) {
  
      //Iterate through the recipes array of objects so that recipes[i] lets you access each recipe individually
      //Construct the cardRequestURL (see spoonacular's documentation for the Get Recipe Card end point). It requires a recipe id which you can express in terms of a variable ${recipes[i].id}. End the query string with &apiKey=${apiKeySpnclr}. 
      //Do the fetch request, passing in cardRequestURL as a parameter
      //In the second .then block log the response (should be an http URL which can be used as a src for rendering)
      //Use createElement and appendChild to dynamically create the card elements and push data.url to them as the image src. You will want to do a document.location.replace so that results.html is now your document
      //Do a catch method for handling any errors in the fetch request
      //}
  
  
  // Function to display the modal (relevant for p 1, p 2 and p 3)
  function displayModal(title, body) {
    var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    var modalTitle = document.getElementById('exampleModalLabel');
    var modalBody = document.querySelector('.modal-body');
  
    modalTitle.textContent = title;
    modalBody.textContent = body;
  
    modal.show();
  }
  