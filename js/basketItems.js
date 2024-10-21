
function basketItemsPlus(){    
    numberCart.innerHTML = ++ numberCart.innerHTML;
}

function basketItemsMinus(){
    numberCart.innerHTML = -- numberCart.innerHTML;
}

function basketItemsRemove(){
    
    const counters = document.querySelectorAll('.item__current');
    const basketItemCountElement = document.querySelector('#basket_items_count');

    let totalItemCount = 0;

    counters.forEach(counter => {
        totalItemCount += parseInt(counter.textContent);
    });

    basketItemCountElement.textContent = totalItemCount;

}
