const basePancakeRecipe = {
    servings: 2,
    ingredients: [
        { item: "all-purpose flour", amount: 120, unit: "g", scalable: true },
        { item: "sugar", amount: 40, unit: "g", scalable: true },
        { item: "baking powder", amount: 1, unit: "tsp", scalable: true },
        { item: "salt", amount: 0.5, unit: "tsp", scalable: false },
        { item: "milk", amount: 100, unit: "ml", scalable: true },
        { item: "egg yolks", amount: 2, unit: "", scalable: true },
        { item: "egg whites", amount: 4, unit: "", scalable: true },
        { item: "vanilla extract", amount: 1, unit: "tsp", scalable: false },
        { item: "butter", amount: 2, unit: "tbsp", scalable: false }
    ],
    totalTime: 30 // in minutes
};

// convert decimal to fraction string
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

function formatAmount(amount) {
    return decimalToFraction(amount);
}

function adjustPancakeServings(change) {
    const servingsElement = document.getElementById('servings-info');
    const totalTimeElement = document.getElementById('total-time');
    const ingredientsListElement = document.getElementById('ingredients-list');

    let currentServings = parseInt(servingsElement.textContent);
    let newServings = currentServings + change;

    if (newServings < 1) return; // prevent going below 1 serving

    servingsElement.textContent = newServings;
    totalTimeElement.textContent = (basePancakeRecipe.totalTime * newServings / basePancakeRecipe.servings) + ' min';

    ingredientsListElement.innerHTML = '';

    basePancakeRecipe.ingredients.forEach((ingredient, index) => {
        let newAmount = ingredient.scalable ? (ingredient.amount * newServings / basePancakeRecipe.servings) : ingredient.amount;
        let formattedAmount = formatAmount(newAmount);

        let listItem = document.createElement('li');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `ingredient-${index}`;
        checkbox.classList.add('ingredient-checkbox');

        let label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = `${formattedAmount} ${ingredient.unit} ${ingredient.item}`;

        checkbox.addEventListener('change', () => {
            label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            label.style.color = checkbox.checked ? 'grey' : 'inherit';
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        ingredientsListElement.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', () => adjustPancakeServings(0));

document.getElementById('increment').addEventListener('click', () => adjustPancakeServings(1));
document.getElementById('decrement').addEventListener('click', () => adjustPancakeServings(-1));