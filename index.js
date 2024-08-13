import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, onValue, push, remove } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const appSettings = {
    databaseURL: 'https://playground-3e193-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shoppingList');

const cartValue = document.getElementById('input-field');
const addButton = document.getElementById('add-button');
const shoppingList = document.getElementById('shopping-list');
const counter = document.getElementById('counter');

addButton.addEventListener('click', () => {
    const inputValue = cartValue.value;
    push (shoppingListInDB, inputValue);
    // renderItems(inputValue); 
    clearInput();
    // console.log(inputValue);
    counter.classList.add('active')
})

onValue(shoppingListInDB, (snapshot) => {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingList();
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemId = currentItem[0];
            // console.log(currentItemId)
            appendToShoppingList(currentItem)
        }        
    }else {
        shoppingList.innerHTML = 'Your list is empty'
    }
})
// console.log(app)

// const renderItems = (inputValue) => {
//     shoppingList.innerHTML += `<li>${inputValue}</li>`
// }

const clearInput = () => {
    cartValue.value = '';
}

const clearShoppingList = () => {
    shoppingList.innerHTML = '';
}

function appendToShoppingList(item) {
    let itemID = item[0];
    let itemValue = item[1];
    let newEl = document.createElement('li');
    newEl.textContent = itemValue;
    newEl.id = itemID;
    newEl.addEventListener('click', () => {
        let exactLocationInDB = ref(database, `shoppingList/${itemID}`);
        remove(exactLocationInDB);
    })
    shoppingList.append(newEl);
  }