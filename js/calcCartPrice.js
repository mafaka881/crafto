function calcCartPrice(){
     const cartItems = document.querySelectorAll('.model_body');
     const totalPriceEl = document.querySelector('.total__calc');
     let totalPrice = 0;

     cartItems.forEach(function(item){
         const emoundEl = item.querySelector('[data-counter]');
         const priceEl = item.querySelector('.cart_price');

         const currentPrice = parseInt(emoundEl.innerText) * parseInt(priceEl.innerText);
         totalPrice += currentPrice;
         
     })
     totalPriceEl.innerText = totalPrice;
     
}