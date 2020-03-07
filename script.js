
// variables

const addItemsAction = document.querySelector('.addItems-action');
const input = document.querySelector('.addItems-input');
const submit = document.querySelector('.addItems-submit');

const list = document.querySelector('.grocery-list');
const displayItemsAction = document.querySelector('.displayItems-action');
const clear = document.querySelector('.displayItems-clear');

// event listeners

submit.addEventListener('click', addItem);

document.addEventListener('DOMContentLoaded', displayStorage);

clear.addEventListener('click', removeItems);

list.addEventListener('click', removeSingleItem);
/*
document.querySelector('.grocery-item__link').addEventListener('click', function() {

    console.log('trashy canny wizzy and woppy');
})

clear.addEventListener('click', function() {

    console.log('clear');
})
*/
// functions

function addItem(event) {

    event.preventDefault();

    let value = input.value;
    console.log(value);

    if(value === '') {
        showAction(addItemsAction, 'Please add grocery item', false);
       
    } else {
        showAction(addItemsAction, `${value} added to the list`,  true);
        createItem(value);
        updateStorage(value);

    }
}

// show action


function showAction(element, text, value) {

    if(value === true) {
        element.classList.add('success');
        element.innerText = text;
        input.value =  '';
        setTimeout(function() {
            element.classList.remove('success');
        }, 3000)
    } else {
        element.classList.add('alert');
        element.innerText = text;
        input.value = '';
        setTimeout(function() {
            element.classList.remove('alert');
        }, 3000)
    }
}

// create item


function createItem(value) {

    let parent = document.createElement('div');
    parent.classList.add('grocery-item');
    parent.innerHTML = `
    <h4 class="grocery-item__title">${value}</h4>
    <a href="#" class="grocery-item__link"><i class="far fa-trash-alt"></i></a>
    `;

    list.appendChild(parent);
}

// remove all items

function removeItems() {

    // delete from local storage
   localStorage.removeItem('groceryList');

    let items = document.querySelectorAll('.grocery-item');
    console.log(items)

    if(items.length > 0) {
        showAction(displayItemsAction, 'All items deleted', false);

        items.forEach(item => {
            list.removeChild(item);
        })
    } else {
        showAction(displayItemsAction, 'No more items to delete', true);
    }
}


// remove single item

function removeSingleItem(event){

    event.preventDefault();

    console.log(event.target.parentElement.classList.contains('grocery-item__link'));
    let link = event.target.parentElement;

    if(link.classList.contains('grocery-item__link')) {

        let text = link.previousElementSibling.innerHTML;
        let groceryItem = event.target.parentElement.parentElement;

        // remove from the list
        list.removeChild(groceryItem);
        showAction(displayItemsAction, `${text} removed from the list`, true);

        // remove from the local storage

        editStorage(text);

    }
}
/*
function clearSingle(event) {

    if(event.target.parentElement.classList.contains('grocery-item__link')) {
       
        
        let parent = event.target.parentElement.parentElement;
        list.removeChild(parent)
        
        let text = event.target.parentElement.previousElementSibling.textContent;

        deleteStorage(text);
        
    }
}
*/
// update storage

function updateStorage(value) {

    let groceryList;
    // let exists = localStorage.getItem('groceryList');

    groceryList = localStorage.getItem('groceryList') ? JSON.parse(localStorage.getItem('groceryList')) : [];
      
    groceryList.push(value);
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
    
    /*
    if(exists) {
        groceryList = JSON.parse(localStorage.getItem('groceryList'));
    } else {
        exists = [];
    }
    */
}

 // localStorage.clear();

 // display storage
 
function displayStorage() {

    let exists = localStorage.getItem('groceryList');

    if(exists) {

        let storageItems = JSON.parse(localStorage.getItem('groceryList'));

        storageItems.forEach( element => {

           createItem(element)
           
        })
    }
 }
/*
 function deleteStorage(text) {

    let items = JSON.parse(localStorage.getItem('groceryList'));
    // let exists = localStorage.getItem('groceryList');

        items.forEach(item => {
        
          if(item !== text) {

            return item;
          }
        })
 }
*/

///

 function editStorage(item) {


    let groceryItems = JSON.parse(localStorage.getItem('groceryList'));

    /*
    let items = groceryItems.filter( item => {

        if (item !== text) {

            
            return item;

        }
    })

    localStorage.removeItem('groceryList');
    localStorage.setItem('groceryList', JSON.stringify(items));
    */
    
    // console.log(groceryItems);
   
    let index = groceryItems.indexOf(item);
    
    // remove 1 item in array with index
    groceryItems.splice(index, 1);
    console.log(groceryItems);

    localStorage.removeItem('groceryList');
    localStorage.setItem('groceryList', JSON.stringify(groceryItems));

    

 }
