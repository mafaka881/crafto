function toggleCartStatus(){
    const cartWrapper = document.querySelector('.cartPrice');
    const cartEmpty = document.querySelector('.backet_close');

    if (cartWrapper.children.length > 0){
        cartEmpty.style.display = "none";
    }else {
        cartEmpty.style.display = "block";
        
    };
}