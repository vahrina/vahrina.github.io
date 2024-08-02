document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');
    const groceryList = JSON.parse(localStorage.getItem('groceryList')) || [];

    function renderList() {
        app.innerHTML = `
            <h1>Grocery List</h1>
            <ul>
                ${groceryList.map((item, index) => `
                    <li class="${item.purchased ? 'purchased' : ''}">
                        ${item.category ? `[${item.category}] ` : ''}${item.name}
                        <div>
                            <button class="mark" onclick="togglePurchased(${index})">${item.purchased ? 'Unmark' : 'Mark'}</button>
                            <button class="delete" onclick="deleteItem(${index})">Delete</button>
                        </div>
                    </li>
                `).join('')}
            </ul>
            <input type="text" id="itemInput" placeholder="Add a new item" autocomplete="off" />
            <select id="categoryInput">
                <option value="">No Category</option>
                <option value="🍇">Fruits</option>
                <option value="🥕">Vegetables</option>
                <option value="🧀">Dairy</option>
                <option value="🥩">Meat</option>
                <option value="🍞">Bakery</option>
            </select>
            <button onclick="addItem()">Add</button>
            <button class="share" onclick="shareList()">Share List</button>
        `;
    }

    window.addItem = function () {
        const itemInput = document.getElementById('itemInput');
        const categoryInput = document.getElementById('categoryInput');
        const newItem = itemInput.value.trim();
        const category = categoryInput.value;

        if (newItem) {
            groceryList.push({ name: newItem, category, purchased: false });
            localStorage.setItem('groceryList', JSON.stringify(groceryList));
            itemInput.value = '';
            categoryInput.value = '';
            renderList();
        }
    };

    window.deleteItem = function (index) {
        groceryList.splice(index, 1);
        localStorage.setItem('groceryList', JSON.stringify(groceryList));
        renderList();
    };

    window.togglePurchased = function (index) {
        groceryList[index].purchased = !groceryList[index].purchased;
        localStorage.setItem('groceryList', JSON.stringify(groceryList));
        renderList();
    };

    window.shareList = function () {
        const listText = groceryList.map(item => `${item.purchased ? '[Purchased] ' : ''}${item.category ? `[${item.category}] ` : ''}${item.name}`).join('\n');
        if (navigator.share) {
            navigator.share({
                title: 'Grocery List',
                text: listText,
            }).catch(console.error);
        } else {
            alert('Sharing not supported on this browser.');
        }
    };

    renderList();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
