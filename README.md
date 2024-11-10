# PantryAI

**PantryAI** is a web-based application that helps you discover recipes based on the ingredients available in your pantry. By leveraging the Spoonacular API for recipe discovery and Azure Cognitive Services for AI-powered ingredient analysis, the app provides users with not only recipe suggestions but also insightful analyses of their ingredients, helping them make informed decisions about their meals.

## Features:
- **Recipe Search by Ingredient:** Enter an ingredient, and the app will retrieve recipes containing it.
- **AI Insights for Ingredients:** Receive detailed analysis and key phrases related to the ingredients used in a selected recipe using Azure AI.
- **Recipe Details:** View important information about the recipe, such as the number of ingredients used and the number of missing ingredients.
- **Nutrient Suggestions:** Based on the ingredients in a recipe, the app will suggest potential nutrients, though this feature is currently under development.

## Technologies Used:
- **HTML5, CSS3, JavaScript** for front-end development.
- **Spoonacular API** for recipe suggestions based on the user's input.
- **Azure Cognitive Services (Text Analytics API)** for ingredient analysis and extracting key insights.

## How to Use:

1. **Clone or Download the Repository:**
   You can download the repository from GitHub to your local system to begin using the application.

2. **Set Up Your API Keys:**
   - **Spoonacular API:** You will need a Spoonacular API key to retrieve recipe data. Replace the default key in the `script.js` file with your personal API key.
   - **Azure Cognitive Services API:** Set up your Azure Cognitive Services account and replace the Azure API key in the `analyzeWithAzureAI()` function in `script.js` with your own API key.

3. **Open the Application:**
   Open the `index.html` file in your browser to access the PantryAI app. You can start by typing an ingredient into the search bar, and the app will fetch recipe suggestions. Once you select a recipe, you can click the "Get AI Insights" button to receive detailed ingredient analysis.


## Core Functions:

### `analyzeWithAzureAI(ingredients)`
This function sends a list of ingredients to Azure’s Text Analytics API to analyze the key phrases and extract useful insights. The response provides a breakdown of the ingredients used in the recipe.

### `getRecipeInsights(recipeId)`
This function is triggered when the user clicks the "Get AI Insights" button on a recipe. It fetches detailed recipe information from the Spoonacular API and processes the ingredients with the Azure AI service to offer insights.

## Error Handling:
- If the required API keys are missing or incorrect, an error message will be displayed in the console.
- If no ingredient is entered or if no recipes match the search criteria, the app will prompt the user to enter a valid ingredient.
- In case of an error fetching data from the APIs, the app will show a message indicating that there was an issue with the request.

## Contributions:
Feel free to contribute by forking the repository or opening a pull request. If you have any suggestions, bug fixes, or improvements, open an issue, and we will address it as soon as possible.

## License:
This project is licensed under the MIT License. See the LICENSE file for more details.


