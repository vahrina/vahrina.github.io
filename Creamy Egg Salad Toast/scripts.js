// Base recipe quantities with units separated from amounts
const baseRecipe = {
    servings: 2,
    ingredients: [
        { item: "bread", amount: 4, unit: "slices", scalable: true },
        { item: "olive oil", amount: 2, unit: "tbsp", scalable: false },
        { item: "eggs", amount: 4, unit: "", scalable: true },
        { item: "mayonnaise", amount: 4, unit: "tbsp", scalable: false },
        { item: "mustard", amount: 2, unit: "tsp", scalable: false },
        { item: "salt", amount: 0.5, unit: "tsp", scalable: false },
        { item: "pepper", amount: 0.25, unit: "tsp", scalable: false },
        { item: "lemon juice", amount: 2, unit: "tsp", scalable: false },
        { item: "garlic", amount: 1, unit: "clove", scalable: false },
        { item: "parsley (optional)", amount: 1, unit: "tbsp", scalable: false }
    ],
    totalTime: 20 // in minutes
};

// Convert decimal to fraction string
function decimalToFraction(decimal) {
    if (decimal % 1 === 0) {
        return decimal; // whole number
    }
    if (decimal === 0.5) {
        return "1/2";
    }
    if (decimal === 0.25) {
        return "1/4";
    }
    if (decimal === 0.75) {
        return "3/4";
    }
    if (decimal === 0.125) {
        return "1/8";
    }
    return decimal.toFixed(2); // fallback for other decimals
}

// Format amount based on its value
function formatAmount(amount) {
    return decimalToFraction(amount);
}

function adjustServings(change) {
    const servingsElement = document.getElementById('servings-info');
    const totalTimeElement = document.getElementById('total-time');
    const ingredientsListElement = document.getElementById('ingredients-list');

    let currentServings = parseInt(servingsElement.textContent);
    let newServings = currentServings + change;

    if (newServings < 1) return; // Prevent going below 1 serving

    servingsElement.textContent = newServings;
    totalTimeElement.textContent = (baseRecipe.totalTime * newServings / baseRecipe.servings) + ' min';

    ingredientsListElement.innerHTML = '';

    baseRecipe.ingredients.forEach((ingredient, index) => {
        let newAmount = ingredient.scalable ? (ingredient.amount * newServings / baseRecipe.servings) : ingredient.amount;
        let formattedAmount = formatAmount(newAmount);

        let listItem = document.createElement('li');

        // Create a checkbox
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `ingredient-${index}`;
        checkbox.classList.add('ingredient-checkbox');

        // Create a label for the checkbox
        let label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = `${formattedAmount} ${ingredient.unit} ${ingredient.item}`;

        // Add event listener for the checkbox to apply styles
        checkbox.addEventListener('change', () => {
            label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            label.style.color = checkbox.checked ? 'grey' : 'inherit';
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        ingredientsListElement.appendChild(listItem);
    });
}

// Initialize the ingredients list on page load
document.addEventListener('DOMContentLoaded', () => adjustServings(0));

// Add event listeners to the buttons
document.getElementById('increment').addEventListener('click', () => adjustServings(1));
document.getElementById('decrement').addEventListener('click', () => adjustServings(-1));
