document.getElementById('search').addEventListener('click', async () => {
    const ingredient = document.getElementById('ingredient').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!ingredient) {
        resultsDiv.innerHTML = '<p>Please enter an ingredient.</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&apiKey=db64a61aafb54291bc49f3b5452eeb7a`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const recipes = await response.json();

        if (recipes.length === 0) {
            resultsDiv.innerHTML = '<p>No recipes found.</p>';
            return;
        }

        recipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe';
            recipeDiv.innerHTML = `
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}" style="width:100%; height:auto;" />
                <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
                <p>Missing Ingredients: ${recipe.missedIngredientCount}</p>
            `;
            resultsDiv.appendChild(recipeDiv);
        });
    } catch (error) {
        console.error('Fetch error:', error);
        resultsDiv.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
    }
});

