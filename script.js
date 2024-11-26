const API_KEY = "462e44aed787492cb67b628c5430eab3"; // Replace with your API key
const BASE_URL = "https://api.spoonacular.com/recipes/findByIngredients";

document
  .getElementById("ingredient-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const ingredients = document.getElementById("ingredients").value;
    fetchRecipes(ingredients);
  });

async function fetchRecipes(ingredients) {
  const recipesDiv = document.getElementById("recipes");
  recipesDiv.innerHTML = "Loading recipes...";

  try {
    const response = await fetch(
      `${BASE_URL}?ingredients=${ingredients}&number=5&apiKey=${API_KEY}`
    );
    const data = await response.json();

    if (data.length === 0) {
      recipesDiv.innerHTML = "No recipes found. Try different ingredients!";
      return;
    }

    recipesDiv.innerHTML = data
      .map(
        (recipe) => `
      <div class="recipe">
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}" width="200">
        <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
        <p>Missed Ingredients: ${recipe.missedIngredientCount}</p>
      </div>
    `
      )
      .join("");
  } catch (error) {
    recipesDiv.innerHTML = "Error fetching recipes. Please try again.";
    console.error("Error:", error);
  }
}
