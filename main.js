const apiUrl1 = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const apiUrl2 = "https://www.themealdb.com/api/json/v1/1/filter.php?";


// Fetch API data
async function APIresponse(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } 
  catch (error) {
    console.error(`Error, data not found: ${error}`);
  }
}

async function getMeal(url) {
  const mealContainer = await document.querySelector(".menu");
  const mealContainer1 = document.querySelector(".menu1");
  const errorContainer = document.querySelector(".error");

  mealContainer.innerHTML = "";
  mealContainer1.innerHTML = "";
  errorContainer.style.display = "none";

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Check if the API response contains results
    if (!data.meals || data.meals.length == 0) {
      if (errorContainer) {
        errorContainer.style.display = "block";
        console.log("Meal not found. Try with another valid criteria.");
      } 
      else {
        console.error("Error container not found."); // Handle absence of container
      }
      return; // Exit if no results found
    }

    // console.log("Wrong path, not out of the loop.");

    const mealName = data.meals[0].strMeal;
    const recipeSteps = data.meals[0].strInstructions;
    const mealPic = data.meals[0].strMealThumb;
    const meal_tag = data.meals[0].strTags;

    // Create HTML elements for the meal name and picture
    const mealUnit1= document.createElement("div");
    const mealUnit2= document.createElement("div");
    const mealUnit3= document.createElement("div");
    const mealNameElement = document.createElement("h2");
    const mealPicture = document.createElement("img");
    const recipe = document.createElement("p");
    const mealTag = document.createElement("p");
   

    // Assign classes or styles if necessary
    mealUnit1.classList.add("mealTitle");
    mealUnit2.classList.add("picture-ingredients");
    mealUnit3.classList.add("recipeSteps");
    mealNameElement.classList.add("name");
    mealPicture.classList.add("icon");
    //mealPicture.style.width = "400px";
    mealTag.classList.add("description");
    

    // Assign content and attributes to the elements
    mealNameElement.textContent = mealName;
    mealPicture.src = mealPic;
    mealTag.textContent = meal_tag;

    // Split recipeSteps into steps using the split() method and regular expressions
    const steps = recipeSteps.split(/\r\n/);

    // Create paragraph elements for each step
    steps.forEach((step) => {
      const stepUnit = document.createElement("p");
      stepUnit.textContent = step;
      recipe.appendChild(stepUnit);
    });
    
    const listContainer = document.createElement("div");
    listContainer.classList.add("ingredient");

    // Iterate over each ingredient
    for (let i = 1; i <= 20; i++) {
      const strIngredient = data.meals[0]["strIngredient" + i];
      const strSize = data.meals[0]["strMeasure" + i];

      // Check if the ingredient is not empty
      if (strIngredient.trim() !== "") {
        // Create a new list item element and assign the ingredient as its text
        const listItem = document.createElement("li");
        listItem.textContent = strSize + " " + strIngredient;

        // Add the list item element to the ingredients element
        listContainer.appendChild(listItem);
      } 
      else {
        // If the ingredient is empty, there are no more ingredients
        break;
      }
    }
   // Get the container where you want to place the list (mealUnit)

   // Create a new h2 heading element for the title "Ingredients"
    const mealTitle = document.createElement("h3");
    const mealTitle2 = document.createElement("h3");
    mealTitle.textContent = "Ingredients:";
    mealTitle2.textContent = "Instructions:";

    // Add the title to the list container
    listContainer.insertBefore(mealTitle, listContainer.firstChild);
    recipe.insertBefore(mealTitle2, recipe.firstChild);

// Get the container where you want to place the list (mealUnit)

    // Add the list container to the element where you want to display the list
    
     // Add the elements to the main container
     mealUnit1.appendChild(mealNameElement);
     mealUnit2.appendChild(mealPicture);
     mealUnit2.appendChild(listContainer);
     mealUnit3.appendChild(recipe);
     mealUnit3.appendChild(mealTag);
     mealContainer.appendChild(mealUnit1);
     mealContainer.appendChild(mealUnit2);
     mealContainer.appendChild(mealUnit3);
 
  } 
  
  // API error or invalid URL
  catch (error) {
    console.log("No recipies were found with that criteria. Try with another valid criteria.");
    const errorContainer = document.querySelector(".error");
    errorContainer.style.display = "block";
  }
}

async function mealFilter(url) {
  const mealContainer = document.querySelector(".menu1");
  const mealContainer1 = await document.querySelector(".menu");
  mealContainer.innerHTML = "";
  mealContainer1.innerHTML = "";
  
  const errorContainer = document.querySelector(".error");
  errorContainer.style.display = "none";

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data.meals || data.meals.length == 0) {
      if (errorContainer) {
        errorContainer.style.display = "block";
        console.log("error de erroes");
      } else {
        console.error("No se encontró el contenedor de error."); // Handle absence of container
      }
      return; // Exit if no results found
    }
      // Generate a random number from 0 to data.meals.length
      

    for (let i = 0; i < data.meals.length; i++) {
        if (i == 18) {
          break;
        }
        
      const mealName = data.meals[i].strMeal;
      const mealPic = data.meals[i].strMealThumb;

      // Create HTML elements for the meal name and picture
      const mealUnit2 = document.createElement("div");
      const mealNameElement = document.createElement("h2");
      const mealPicture = document.createElement("img");

      // Assign classes or styles if necessary
      mealNameElement.classList.add("name1");
      mealPicture.classList.add("icon1");
      mealPicture.style.width = "200px";

      // Assign content and attributes to the elements
      mealNameElement.textContent = mealName;
      mealPicture.src = mealPic;

      // Add the elements to the main container
      mealUnit2.appendChild(mealNameElement);
      mealUnit2.appendChild(mealPicture);
      mealContainer.appendChild(mealUnit2);

      // Add a click event to the meal container
      mealUnit2.addEventListener("click", () => {
        const Plato =mealName; // Pass the meal name as a parameter
        const url1 = `${apiUrl1}${Plato}`;
        getMeal(url1);
        console.log(Plato);
        });
    }
  } 
  
  catch (error) {
    // API error or invalid URL
    console.log("No recipies were found with that criteria. Try with another valid criteria.");
    const errorContainer = document.querySelector(".error");
    errorContainer.style.display = "block";
  }
}

const searchButton = document.querySelector(".finder button");
const searchInput = document.querySelector(".finder input");

searchButton.addEventListener("click", async () => {
  const criteria = document.getElementById("option-criteria").value;
  const meal = searchInput.value;

  console.log(meal);

  switch (criteria) {
    case "name":
      const url1 = `${apiUrl1}${meal}`;
      await getMeal(url1);
      console.log(url1);
      break;

    case "category":
      const url2 = `${apiUrl2}c=${meal}`;
      await mealFilter(url2);
      console.log(url2);
      break;

    case "ingredient":
      const url3 = `${apiUrl2}i=${meal}`;
      await mealFilter(url3);
      console.log(url3);
      break;

    case "area":
      const url4 = `${apiUrl2}a=${meal}`;
      await mealFilter(url4);
      console.log(url4);
      break;

    default:
      console.error("Invalid search option.");
      break;
  }
});

// Sky Food navigation bar logo
const logo = document.getElementById('home-logo');

// Reload the page when the navigation bar logo is clicked
logo.addEventListener('click', () => {
  location.reload();
  }
);
