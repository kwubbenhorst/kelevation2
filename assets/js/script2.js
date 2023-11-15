var input2 = document.querySelector(".input-2");
  if (!input2) {
    console.error("Input 2 not found");
  }

  var searchBtn2El = document.querySelector(".btn-menus-page");
  if (!searchBtn2El) {
    console.error("SearchBtn2El not found");
  }

// Check if you are on menus.html before accessing elements specific to that page
if (window.location.href.includes('menus.html')) {
  var input2 = document.querySelector(".input-2");
  var searchBtn2El = document.querySelector(".btn-menus-page");

  function handleSearchButtonClick2() {
      console.log('Button 2 clicked');
      getRecipes().then(function () {
          // Delay the page replacement for 5 seconds (5000 milliseconds) for testing
          setTimeout(function () {
              window.location.href = "../library/results.html";
          }, 20000); // Adjust the delay as needed
      });
  }

  // Added event listener to the search button on menus.html
  if (searchBtn2El) {
      console.log('after element selection, searchBtn2El:', searchBtn2El);
      searchBtn2El.addEventListener("click", handleSearchButtonClick2);
  } else {
      console.log('Element with class "btn-menus-page" not found in the current page.');
  }
}
});









console.log('before adding event listener');
//console.log(searchBtn1El);
console.log(searchBtn2El);

//Added an event listener to the search button on search.html to call the getRecipes function on click
searchBtn1El.addEventListener("click", function() {
  console.log('Button 1 clicked');
  getRecipes();
  console.log('After getRecipes function call');
  window.location.href = '../library/menus.html';
});
console.log('after adding event listener');
console.log ('before element selection');

// Function to handle click event on search button
function handleSearchButtonClick() {
  console.log('Button 2 clicked');
  // Call getRecipes and use then to handle the completion before navigating
  getRecipes().then(function () {
    // Delay the page replacement for 5 seconds (5000 milliseconds) for testing
    setTimeout(function () {
      window.location.href = "../library/results.html";
    }, 20000); // Adjust the delay as needed
  });
}

// Added an event listener to the search button on search.html to call the handleSearchButtonClick function on click
if (searchBtn2El) {
  console.log('after element selection, searchBtn2El:', searchBtn2El);
  searchBtn2El.addEventListener("click", handleSearchButtonClick);
} else {
  console.log('Element with class "btn-menus-page" not found in the current page.');
}

console.log('after adding event listener');
console.log('before element selection');
})


/*
console.log('before adding event listener');
//console.log(searchBtn1El);
console.log(searchBtn2El);

//Added an event listener to the search button on search.html to call the getRecipes function on click
//searchBtn1El.addEventListener("click", function() {
//console.log('Button 1 clicked');
//getRecipes();
//console.log('After getRecipes function call');
////window.location.href = '../library/menus.html';
//});
console.log('after adding event listener');
console.log ('before element selection');

if (searchBtn2El) {
console.log('after element selection, searchBtn2El:', searchBtn2El);

searchBtn2El.addEventListener("click", function() {
console.log('Button 2 clicked');
// Call getRecipes and use then to handle the completion before navigating
getRecipes().then(function() {
// Delay the page replacement for 5 seconds (5000 milliseconds) for testing
setTimeout(function() {
window.location.href = "../library/results.html";
}, 20000); // Adjust the delay as needed
});
console.log('After element selection, searchBtn2El:', searchBtn2El);
});
} else {
console.log('Element with class "btn-menus-page" not found in the current page.');
}
});
*/