"use strict"

const getMoreQuotesButton = document.getElementById('coffeeButton');
getMoreQuotesButton.addEventListener('click', function(e){
    e.preventDefault();
    updateList();
});

function updateList() {
    return fetch('https://dc-coffeerun.herokuapp.com/api/coffeeOrders')
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                addItem(data[Object.keys(data)[0]]);
            })
            .catch(err => {
                return err;
            })
}

function addItem(item){
    const coffeeList = document.getElementById('coffeeList');
    const coffeeItem = document.createElement('li');
    coffeeItem.textContent = item.emailAddress;
    coffeeList.append(coffeeItem)
}
