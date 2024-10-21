
const cartIcon = document.querySelector('.basket'); // Іконка корзини
let numberCart = document.querySelector('.basket_items'); // Кількість товарів в корзині
const model = document.querySelector('.model'); // Модельне вікно
const basketTop = document.querySelector('.model_basket'); //вінко корзини
const closeBtn = document.querySelector('.close_model'); // Кнопка продовжити покупки
const addBasketBtn = document.querySelectorAll('.price_add'); // Кнопка у кошик
const cartPrice = document.querySelector('.cartPrice');
let totalCalc = document.querySelector('.total__calc');
const addBtn = document.querySelector('.btn_add'); // Кнопка оформити замовлення
const cartPriceFinis = document.querySelector('.cart_price_finish'); // Карточки товарів в корзині basket


const btnMinus = document.querySelector('[data-action="minus"]');
const btnPlus = document.querySelector('[data-action="plus"]');
const counter = document.querySelector('[data-counter]');

const delBasketText = document.querySelector('.backet_close'); // Удаляєм текст "Корзина пуста"
const priceBasketText = document.querySelector('.all__calc__top'); // Удаляєм текст Ціна
  

cartIcon.addEventListener('click', ()=>{
    if (model.style.display = 'none'){
        model.style.display = 'flex';
    } else{
        model.style.display = 'none';
    }
})

closeBtn.addEventListener('click', ()=>{
    model.style.display = 'none';
})

// Кнопка у кошик
addBasketBtn.forEach(button =>{
    button.addEventListener('click', function(event){ 
        
        basketItemsPlus(); 
         
        model.style.display ='flex';
        
        
            const cart = event.target.closest('.cart');
            //Зібрали данні з Карточки
            const productInfo = {
                id: cart.dataset.id,
                imgScr: cart.querySelector('.cart_img').getAttribute('src'),
                title : cart.querySelector('.number_cart').innerText,
                price: cart.querySelector('.price_cart').innerText,                 
            }

            const itemInCart = basketTop.querySelector(`[data-id="${productInfo.id}"]`);

            if(itemInCart){
                const counterElement = itemInCart.querySelector('[data-counter]');
                counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
                
            } else{
                 
                // Якщо товара немає в корзині                
	        const cartItemHTML = `<div class="model_body">
            <div class="model_info">
                <div class="model_img"><img src="${productInfo.imgScr}" alt="${productInfo.title}"></div>
                <div class="model_title">${productInfo.title}</div>                        
            </div>
            <div class="cart_id" data-id="${productInfo.id}"></div>
            <div class="counter-wrapper">
                <div class="item__control" data-action="minus">-</div>                
                <div class="item__current" data-counter>1</div> 
                <div class="item__control" data-action="plus">+</div>    
            </div>
            <div class= "delete">X</div>
            <div class="cart_price">${productInfo.price}</div>
            </div>`;
             
            //Вказуєм куда відобразити код            
            cartPrice.insertAdjacentHTML('beforeend', cartItemHTML);                        
            toggleCartStatus();
            calcCartPrice(); 
            addDateStorage();                                 
        }     
                             
    })
    
})


// Прослушка в можельнім вікні
model.addEventListener("click", function(event){
    let counter;

    if(event.target.dataset.action === "plus" || event.target.dataset.action === "minus" ){
         const counterWrapper = event.target.closest('.counter-wrapper');
         const counter = counterWrapper.querySelector('[data-counter]');
         
         
    if(event.target.dataset.action === "plus"){
        counter.innerText = ++ counter.innerText;
        basketItemsPlus();
        
    }

    if(event.target.dataset.action === "minus"){  
        basketItemsMinus();
        if(event.target.closest('.cartPrice') && parseInt(counter.innerText) === 1){ 
                  
            event.target.closest('.model_body').remove();
            toggleCartStatus();
            calcCartPrice(); 
            addDateStorage();                         
         }

        if(parseInt(counter.innerText) > 1){
            counter.innerText = --counter.innerText;
                        
         }     
         
    }
    
    if(event.target.hasAttribute('data-action') && event.target.closest('.model_body')){
        calcCartPrice();
       
    }

}    

    if(event.target.closest('.delete')){
        event.target.closest('.model_body').remove();
        toggleCartStatus();
        calcCartPrice();
        basketItemsRemove();
        addDateStorage();    
    } 
    
})



//LocalStorage
const addDateStorage = () =>{
    let parent = cartPrice;
    let html = parent.innerHTML;
    if (html.length){
        localStorage.setItem('product', html);
    }else{
        localStorage.removeItem('product');
    }    
}

const upDateStorage = () =>{
    let produktAdd = localStorage.getItem('product');
    cartPriceFinis.innerHTML = produktAdd;
    cartPrice.innerHTML = produktAdd;
    if(cartPriceFinis.innerHTML.length){
        delBasketText.style.display = "none";
        priceBasketText.style.display = "block";        
    }
}
upDateStorage();



// Чекбокси для доставки
 const radioCheck = document.querySelector('.radio__check');
 const deliveryForm = document.querySelector('.deliveryForm');
 const radioBox = document.querySelector('.radio_box');

 radioCheck.addEventListener('change', function() {
    if (radioCheck.checked) {
        deliveryForm.style.display = "none";
    } else {
        deliveryForm.style.display = "block";
    }    
});

radioBox.addEventListener('change', function() {
    if (radioBox.checked) {
        deliveryForm.style.display = "block";
    } else {
        deliveryForm.style.display = "none";
    }
});




// Нова пошта API
const apiKey = "8cf7f9be1e322a3633607cd3bdb08947";
const apiUrl = "https://api.novaposhta.ua/v2.0/json/";

let cities = [];

window.onload = function() {
    fetchCities();
}

function fetchCities() {
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
            "apiKey": apiKey,
            "modelName": "Address",
            "calledMethod": "getCities"
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        cities = data.data;
        populateCities(cities);
    })
    .catch((error) => console.error('Error:', error));
}

function populateCities(cities) {
    const cityList = document.getElementById('cityList');
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.Description;
        cityList.appendChild(option);
    });
    document.getElementById('city').onchange = fetchBranches;
    fetchBranches();
}

function fetchBranches() {
    const cityName = document.getElementById('city').value;
    const cityRef = cities.find(city => city.Description === cityName).Ref;
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
            "apiKey": apiKey,
            "modelName": "AddressGeneral",
            "calledMethod": "getWarehouses",
            "methodProperties": {
                "CityRef": cityRef
            }
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => populateBranches(data.data))
    .catch((error) => console.error('Error:', error));
}

function populateBranches(branches) {
    const branchSelect = document.getElementById('branch');
    branchSelect.innerHTML = '';
    branches.forEach(branch => {
        const option = document.createElement('option');
        option.value = branch.Ref;
        option.text = branch.Description;
        branchSelect.appendChild(option);
    });
}

