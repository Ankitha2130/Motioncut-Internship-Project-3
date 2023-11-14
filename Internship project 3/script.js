let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Pen-stand colour brown',
        image: "p1.png",
        price: 199
    },
    {
        id: 2,
        name: 'Watch colour black leather belt',
        image: 'p2.jpg',
        price: 549
    },
    {
        id: 3,
        name: 'Sofa pink colour',
        image: 'p3.jpg',
        price: 22000
    },
    {
        id: 4,
        name: 'Wardrobe colour brown 2 steps',
        image: 'p4.jpg',
        price: 5999
    },
    {
        id: 5,
        name: 'T-shirt green colour size 32',
        image: 'p5.jpg',
        price: 789
    },
    {
        id: 6,
        name: 'Fridge maroon colour',
        image: 'p6.jpg',
        price: 19999
    },
    {
        id: 7,
        name: 'Table Lamp brown colour',
        image: 'p7.jpg',
        price: 5324
    },
    {
        id: 8,
        name: 'TV LED 32 inch',
        image: 'p8.jpg',
        price: 50000
    },
    {
        id: 9,
        name: 'Washing Machine 2 feet',
        image: 'p9.jpg',
        price: 35000
    },
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCart(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}