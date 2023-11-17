var accordionHeaderEls = document.querySelectorAll(".accordion-header");
var accordionBodyEls = document.querySelectorAll('.accordion-body');
var accordionBodyEl;
var accordionHeaderEl;
var allRecipeDetails = JSON.parse(localStorage.getItem("recipeinfo"));
var allReturnedRecipes = JSON.parse(localStorage.getItem("recipes"));
var heartBtnEl = document.querySelector(".heart-btn");
//var recipeCardContainer = document.querySelector('.recipe-card-container');

function renderRecipeCard(recipeId) {
  var selectedRecipe = allReturnedRecipes.find(function (recipe) {
    return recipe.id === recipeId || recipe.title === recipeId; // Adjust based on your needs
  });
  // Check if the recipe is found
  if (selectedRecipe) {
    // Access the elements in the recipe card within the context of the recipe card container
    var recipeCardContainer = document.querySelector('.recipe-card-container');
    var recipeTitleEl = recipeCardContainer.querySelector('.recipe-title');
    var servesAndTimeEl = recipeCardContainer.querySelector('.serves-and-time');
    var dishImageEl = recipeCardContainer.querySelector('.dish-image');
    var ingredientsListEl = recipeCardContainer.querySelector('.ingredients-list');
    var methodStepsListEl = recipeCardContainer.querySelector('.method-steps-list');
    var sourceLinkEl = recipeCardContainer.querySelector('.source-link');
    // Update the content of the recipe card
    recipeTitleEl.innerHTML = '<strong>' + selectedRecipe.title + '</strong>';
    servesAndTimeEl.textContent = 'Serves: ' + selectedRecipe.servings + ' | Ready in: ' + selectedRecipe.readyInMinutes + ' minutes';
    dishImageEl.src = selectedRecipe.image;
    // Update Ingredients List
    ingredientsListEl.innerHTML = ''; // Clear existing content
    selectedRecipe.ingredients.forEach(function (ingredient) {
      var ingredientItem = document.createElement('li');
      ingredientItem.textContent = ingredient;
      ingredientsListEl.appendChild(ingredientItem);
    });
    // Update Method Steps List
    methodStepsListEl.innerHTML = ''; // Clear existing content
    selectedRecipe.steps.forEach(function (step) {
      var stepItem = document.createElement('li');
      stepItem.textContent = step;
      methodStepsListEl.appendChild(stepItem);
    });
    // Update Source Link
    sourceLinkEl.href = selectedRecipe.sourceUrl;
    sourceLinkEl.textContent = 'Source: ' + selectedRecipe.sourceUrl;
    // Show the recipe card container
    var recipeCardContainer = document.querySelector('.recipe-card-container');
    recipeCardContainer.style.display = 'block';
  }
}

function renderRecipeDetails(allRecipeDetails) {
    console.log("Rendering recipe details");
    //wrapping this function in a promise so its asynchronous activity has a chance to complete before the program moves on
    //return new Promise(function (resolve, reject) { 
        //setTimeout(function () {
            console.log('renderingRecipeData');

    // Iterate through each accordion section
    for (var i = 0; i < accordionHeaderEls.length; i++) {
        (function() {
            var recipeDetail = allRecipeDetails[i]; 
        
          accordionHeaderEl = accordionHeaderEls[i];
          accordionBodyEl = accordionBodyEls[i];
  
      // Check if there is a corresponding recipe detail
      if (i < allRecipeDetails.length) {
        // Populate accordion header with the title
        accordionHeaderEl.querySelector('button').textContent = recipeDetail.title;
        // Generate content for accordion body
        var content = '<strong>Likes:</strong> ' + recipeDetail.aggregateLikes;
        content += '<br><strong>Economical:</strong> ';
        if (recipeDetail.cheap) {
        content += '<span style="color: green;">&#10003;</span>';
        } else {
        content += 'No';
        }
        content += '<br><strong>Healthy:</strong> ';
        if (recipeDetail.veryHealthy) {
        content += '<span style="color: green;">&#10003;</span>';
        } else {
        content += 'Not so much';
        }
        // Add cuisine information if available
        if (recipeDetail.cuisines.length > 0) {
          content += '<br><strong>Cuisine:</strong> ' + recipeDetail.cuisines.join(', ');
        }
        // Add portion-size information if available
        if (recipeDetail.weightPerServing.length > 0) {
          content += '<br><strong>Portion-size:</strong> ' + recipeDetail.weightPerServing;
        }
        // Add nutritional info
        content += '<br><strong>Nutrition per portion:</strong> ' + recipeDetail.nutritionalInfo1 + '<br>&emsp;' + recipeDetail.nutritionalInfo2;

        // Add diets information
        if (recipeDetail.diets.length > 0) {
          content += '<br><strong>Suitable for:</strong> ' + recipeDetail.diets.join(', ');
        }
        // Set the innerHTML of the accordion body with the generated content
        accordionBodyEl.innerHTML = '<pre>' + content + '</pre>';
        
        // Create and append the "Get" button dynamically
        var getButton = document.createElement('button');
        getButton.type = 'button';
        getButton.className = 'btn btn-primary get';
        getButton.textContent = 'Get';
        // Capture the recipe id
        var recipeId = getButton.dataset.recipeId;
        getButton.dataset.recipeId = recipeDetail.id;
                    //var recipeId;
        // Add click listener to the "Get" button
        getButton.addEventListener('click', function() {
        // Access the recipe id using the dataset property
        recipeId = this.dataset.recipeId;
        console.log('Recipe ID:', recipeId);

        // Find the selected recipe by ID in the allReturnedRecipes array
        var selectedRecipe = allReturnedRecipes.find(function(recipe) {
        return recipe.id === recipeId;
      });

        // Pass the selected recipe to the renderRecipeCard function
        renderRecipeCard(selectedRecipe);
      

     /*
        // Add click listener to the "Get" button
        getButton.addEventListener('click', function() {
        // Access the recipe id using the dataset property
        recipeId = this.dataset.id;
        console.log('Recipe ID:', recipeId);
        console.log('Recipe Detail:', recipeDetail);
        // Find the selected recipe by ID in the allReturnedRecipes array
        var selectedRecipe = allReturnedRecipes.find(function(recipe) {
        return recipe.id === recipeId;
      }); 
      

  // Pass the selected recipe to the renderRecipeCard function
  renderRecipeCard(selectedRecipe);
  */            

    // Hide the accordion
    var accordionContainer = document.querySelector('.accordion');
    accordionContainer.style.display = 'none';
  });

  // Append the "Get" button after the pre element
  accordionBodyEl.appendChild(getButton);        
} else {
    // If there's no corresponding recipe detail, clear the accordion title and body
    accordionHeaderEl.querySelector('button').textContent = '';
    accordionBodyEl.innerHTML = '';

    // Set button visibility to hidden
    //accordionBodyEl.querySelector('.get').style.visibility = 'hidden';
  }
})();
}

    // Resolve the promise with the recipeId
    //resolve(recipeId);
 
       console.log("Recipe details rendered successfully");
    //}, 100);    
  //});
}

renderRecipeDetails(allRecipeDetails);

/*
// Add click listener to the "Get" button
        heartBtnEl.addEventListener('click', handleSeeFaveClick)
        // Access the recipe id using the dataset property
        recipeId = this.dataset.recipeId;
        console.log('Recipe ID:', recipeId);

        //FUNCTION CLEARHIGHSCORES ------------------------------------------------------------
// called by a click on the Clear Highscores button from the highscores screen. Clears items out of localStorage memory and returns all previous dynamically 
// generated list item elements to an empty string 
function clearHighscores() {
    localStorage.removeItem("highscores");
    if (highscoresListEl) {
      highscoresListEl.innerHTML = "";
    }
  }
  
  
  
  //FUNCTION VIEWHIGHSCORES --------------------------------------------------------------
  // called either from the handleFormSubmit function or from a click on the viewHighscores button.  If the former it is passed a flag as a param. Tthe conditional logic 
  // inside the function deals with the case of it having no flag (ie. shouldCongratulate being undefined). This function is responsible for dynamically generating the 
  // high scores list items, which content it retrieves from localStorage.
  function seeFaves() {
  
    // In case this function gets called when there is content from a previous rendering of the favourites List, the function begins by clearing this out so that there is room for a new dynamic generation of the list group.
    favouritesListEl.innerHTML = "";
    
    var faves = JSON.parse(localStorage.getItem("faves")) || []; //Retrieve favourites from local storage or the empty array if they have only just been initialized
  
    // Iterate through the faves array and assign a variable so each fave of the iteration can be dealt with separately. Create each entry of the favourites list, style & append
    for (var i = 0; i < faves.length; i++) {
      var recipeStar = faves[i];
  
      var favListItem = document.createElement("li");
      favListItem.textContent = (i + 1) + ". " + //fave.recipeStar + " - " + entry.score;
  
      favouritesListEl.appendChild(listItem);
      favouritesListEl.style.display = "block";
    }
    // Display the byline and msgArea Els and set their text and styling
      bylineEl.style.display = "block";
      bylineEl.textContent = "Favourites";
      bylineEl.style.marginTop = "15px";
      msgAreaEl.style.display = "block"; 
      msgAreaEl.style.marginTop = "0";
  
    
    // Display the startOverButton (this is the code name for the button whose text appears as "Go Back" on the screen) and clearHighscoresButton
    buttonContainerEl.style.display = "inline";
  }
  
  
  
  //FUNCTION HANDLEFORMSUBMIT ----------------------------------------------------------------
  // This function is called from a click on the submit button from the all done screen. It takes the newEntry (initials: score) from the last round of the quiz and adds them
  // to the highscores array. (First the array has to be retrieved from localStorage in order to be manipulated). The manipulations: newEntry is pushed in (array may now contain
  // 11 elements if it was already full before the newEntry was added). Array is sorted and sliced so it loses the lowest score entry if there are 11. Array is iterated through, 
  // looking for match with newEntry so value of shouldCongratulate flag can be determined (this will eventually control the message sent to the msgArea element on the next screen).
  // The array is then set back into local storage and the quizAreaMat cleared out of all the elements from this screen preparatory to the highscores list being rendered on the next 
  function handleFavouriting(event) {
    event.preventDefault();
    var recipeStar = //id of click event target (heartbtn, id will be a number)
    if (recipeStar) {
      var faves = JSON.parse(localStorage.getItem("faves")) || []; // Get faves from localStorage or initialize as an empty array
      console.log(faves);
  
      var newFave = { // Create a new recipe entry
        id: recipeStar
      };
  
      faves.push(newFave); // Add the new fave recipe entry to the array
      console.log(highscores);
  
      
  
      faves = faves.slice(0, 10); // If more than 10 items, this ensures the 11th will be sliced off)
  
  
      for (var i = 0; i < faves.length; i++) { // Iterate through the faves array and create a variable so each fave can be considered separately
      var fave = faves[i];
      if (fave.recipeStar === newFave.recipeStar) { // Check for a match between the newFave and the each fave that is being iterated through
      break; // Break the loop once match is found
    }
  }
      localStorage.setItem("faves", JSON.stringify(faves)); // Save manipulated faves array back to localStorage
  
      // Hide the byline, msgArea and form elements. A clean quizAreaMat is wanted for the rendering of the highscores list in the next function
      bylineEl.style.display = "none"; //listheader
      msgAreaEl.style.display = "none"; //listgroup
  
      // Call the viewHighscores function and pass it the flag
      seeFaves();
    }
  }
  */