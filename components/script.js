// Event listener for the search button
document.getElementById('search').addEventListener('click', async () => {
    const ingredient = document.getElementById('ingredient').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!ingredient) {
        resultsDiv.innerHTML = '<p>Please enter an ingredient.</p>';
        return;
    }

    try {
        // First, call Spoonacular API to find recipes based on the ingredient
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&apiKey=db64a61aafb54291bc49f3b5452eeb7a`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const recipes = await response.json();

        if (recipes.length === 0) {
            resultsDiv.innerHTML = '<p>No recipes found.</p>';
            return;
        }

        // Display each recipe with a button to get AI insights
        recipes.forEach((recipe) => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe';
            recipeDiv.innerHTML = `
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}" style="width:100%; height:auto;" />
                <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
                <p>Missing Ingredients: ${recipe.missedIngredientCount}</p>
                <button onclick="getRecipeInsights(${recipe.id})">Get AI Insights</button>
                <div id="insights-${recipe.id}" class="insights"></div>
            `;
            resultsDiv.appendChild(recipeDiv);
        });
    } catch (error) {
        console.error('Fetch error:', error);
        resultsDiv.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
    }
});

// Function to get AI insights when a recipe button is clicked
async function getRecipeInsights(recipeId) {
    const insightsDiv = document.getElementById(`insights-${recipeId}`);
    insightsDiv.innerHTML = 'Loading insights...';

    try {
        // Fetch full recipe information to get detailed ingredients
        const recipeDetailsResponse = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=db64a61aafb54291bc49f3b5452eeb7a`);
        if (!recipeDetailsResponse.ok) {
            throw new Error('Failed to fetch recipe details');
        }

        const recipeDetails = await recipeDetailsResponse.json();
        const ingredients = recipeDetails.extendedIngredients.map(ingredient => ingredient.original).join(', ');

        // Call Azure AI to process the recipe ingredients and provide insights
        const aiResponse = await analyzeWithAzureAI(ingredients);

        insightsDiv.innerHTML = `
            <h4>AI Insights</h4>
            <p><strong>Ingredients Analysis:</strong> ${aiResponse.analysis}</p>
            <p><strong>Suggested Nutrients:</strong> ${aiResponse.nutrients}</p>
        `;
    } catch (error) {
        console.error('Error fetching AI insights:', error);
        insightsDiv.innerHTML = '<p>Error fetching AI insights. Please try again later.</p>';
    }
}

async function analyzeWithAzureAI(ingredients) {
    const endpoint = 'https://lucasdhar.cognitiveservices.azure.com/';
    const apiKey = '14lAPWXqXZWWcuk8YhM6IHB4yT8Q2S5HFr7QI95EhxLiweiU8qsOJQQJ99AKAC4f1cMXJ3w3AAAEACOGCAgF';

    const response = await fetch(endpoint + '/text/analytics/v3.1/keyPhrases', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': apiKey,
        },
        body: JSON.stringify({
            documents: [
                {
                    language: 'en',
                    id: '1',
                    text: ingredients,
                },
            ],
        }),
    });

    if (!response.ok) {
        throw new Error('Azure AI request failed');
    }

    const data = await response.json();

    // Process the response to display meaningful results
    const keyPhrases = data.documents[0].keyPhrases.join(', ');
    const nutrients = 'Coming soon...';  // Placeholder for additional nutrient info

    return {
        analysis: keyPhrases,
        nutrients: nutrients,
    };
}
