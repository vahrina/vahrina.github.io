// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onValue, push, update, remove, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Debugging: Check if Firebase initialized correctly
console.log('Firebase initialized:', app);

// DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
    const appDiv = document.getElementById('app');
    const listRef = ref(database, 'groceryList');

    function renderList(groceryList) {
        appDiv.innerHTML = `
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
        onValue(listRef, (snapshot) => {
            const groceryList = snapshot.val();
            console.log('Grocery List Snapshot:', groceryList); // Debugging
            renderList(Object.values(groceryList || {}));
        });
    }

    // Sign in function
    window.signIn = function () {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log('User signed in', result.user);
            }).catch((error) => {
                console.error('Sign-in error', error);
            });
    };

    // Sign out function
    window.signOut = function () {
        signOut(auth)
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
            push(listRef, {
                name: newItem,
                category: category || null,
                purchased: false
            }).then(() => {
                itemInput.value = '';
                updateGroceryList();
            }).catch((error) => {
                console.error('Add item error', error);
            });
        }
    };

    // Toggle purchased status
    window.togglePurchased = function (index) {
        const itemRef = ref(database, `groceryList/${index}`);
        get(itemRef).then((snapshot) => {
            const item = snapshot.val();
            update(itemRef, {
                purchased: !item.purchased
            }).then(() => {
                updateGroceryList();
            }).catch((error) => {
                console.error('Toggle purchased error', error);
            });
        });
    };

    // Delete item function
    window.deleteItem = function (index) {
        const itemRef = ref(database, `groceryList/${index}`);
        remove(itemRef).then(() => {
            updateGroceryList();
        }).catch((error) => {
            console.error('Delete item error', error);
        });
    };

    // Share list function (for demonstration purposes)
    window.shareList = function () {
        alert('Sharing functionality is not implemented yet.');
    };

    // Initial load
    updateGroceryList();
});
