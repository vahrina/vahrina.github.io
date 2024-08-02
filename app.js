// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_04936pQ2ooTb-uWvpX33uS4FsMhJyGU",
    authDomain: "grocery-app-65fc6.firebaseapp.com",
    databaseURL: "https://grocery-app-65fc6-default-rtdb.firebaseio.com",
    projectId: "grocery-app-65fc6",
    storageBucket: "grocery-app-65fc6.appspot.com",
    messagingSenderId: "153617423147",
    appId: "1:153617423147:web:bddee76ea08451cb7c836e",
    measurementId: "G-KEWQ8HKEZR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth(); 

// Debugging: Check if Firebase initialized correctly
console.log('Firebase initialized:', firebase.apps.length > 0);

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');
    const listRef = database.ref('groceryList');

    function renderList(groceryList) {
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
            <button class="add" onclick="addItem()">Add</button>
            <button class="share" onclick="shareList()">Share List</button>
            <button class="signin" onclick="signIn()">Sign In</button>
            <button class="signout" onclick="signOut()">Sign Out</button>
        `;
    }

    function updateGroceryList() {
        listRef.on('value', (snapshot) => {
            const groceryList = snapshot.val();
            console.log('Grocery List Snapshot:', groceryList); // Debugging
            renderList(Object.values(groceryList || {}));
        });
    }

    // Sign in function
    window.signIn = function () {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                console.log('User signed in', result.user);
            }).catch((error) => {
                console.error('Sign-in error', error);
            });
    };

    // Sign out function
    window.signOut = function () {
        firebase.auth().signOut()
            .then(() => {
                console.log('User signed out');
            }).catch((error) => {
                console.error('Sign-out error', error);
            });
    };

    // Add item function
    window.addItem = function () {
        const itemInput = document.getElementById('itemInput');
        const categoryInput = document.getElementById('categoryInput');
        const newItem = itemInput.value.trim();
        const category = categoryInput.value;

        if (newItem) {
            const newItemRef = listRef.push();
            newItemRef.set({ name: newItem, category, purchased: false });
            itemInput.value = '';
            categoryInput.value = '';
        }
    };

    // Delete item function
    window.deleteItem = function (index) {
        listRef.once('value', (snapshot) => {
            const groceryList = snapshot.val();
            const keyToRemove = Object.keys(groceryList || {})[index];
            listRef.child(keyToRemove).remove()
                .then(() => console.log('Item deleted'))
                .catch((error) => console.error('Delete error', error));
        });
    };

    // Toggle purchased function
    window.togglePurchased = function (index) {
        listRef.once('value', (snapshot) => {
            const groceryList = snapshot.val();
            const keyToUpdate = Object.keys(groceryList || {})[index];
            const item = groceryList[keyToUpdate];
            listRef.child(keyToUpdate).update({ purchased: !item.purchased })
                .then(() => console.log('Item updated'))
                .catch((error) => console.error('Update error', error));
        });
    };

    // Share list function
    window.shareList = function () {
        listRef.once('value', (snapshot) => {
            const groceryList = snapshot.val() || [];
            const listText = Object.values(groceryList).map(item =>
                `${item.purchased ? '[Purchased] ' : ''}${item.category ? `[${item.category}] ` : ''}${item.name}`
            ).join('\n');

            if (navigator.share) {
                navigator.share({
                    title: 'Grocery List',
                    text: listText,
                }).catch((error) => {
                    console.error('Sharing failed', error);
                    alert('Failed to share. Please copy and paste manually.');
                });
            } else {
                prompt('Share this list:', listText);
            }
        });
    };

    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('ServiceWorker registered with scope:', registration.scope);
            }).catch((error) => {
                console.error('ServiceWorker registration failed:', error);
            });
    }

    updateGroceryList();
});
