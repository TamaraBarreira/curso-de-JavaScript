// Carrito
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
//Abriendo carrito
cartIcon.onclick = () => {
    cart.classList.add("active");
};
//Cerrando Carrito
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Carrito funcional con JS
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else {
    ready();
}

// Funcionando
function ready(){
    //removiendo items del carrito
    let removeCartButtons = document.getElementsByClassName("cart-remove")
    console.log(removeCartButtons)
    for (let i = 0; i < removeCartButtons.length; i++){ 
        let button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem) 
     }
    //Cambios en las cantidades
    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs [i]
        input.addEventListener("change", quantityChanged);
    }
    //agregando al carrito
    let addCart = document.getElementsByClassName("add-cart");
    for (let i = 0; i < addCart.length; i++){
        let button = addCart[i]
        button.addEventListener("click", addCartClicked);
    }
    //Boton comprar 
    document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked); 
}
//Botton comprar
function buyButtonClicked(){
    alert("Tu orden esta listo")
    let cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal()
}


//removiendo items del carrito
function removeCartItem(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove()
    updatetotal();
}
// Cambios en la cantidad
function quantityChanged(event){
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1; 
    }
    updatetotal();
}
//Agregar al carrito
function addCartClicked(event){
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}
function addProductToCart(title, price, productImg){
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let cartItems = document.getElementsByClassName("cart-content")[0];
    let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (let i = 0; i < cartItemsNames.length; i++){
        alert ("¿Querés agregar este Item al carrito?");
        return; 
    }
    
}
let cartBoxContent = `   
                            <img src="${productImg}"  alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <!--  Remove Cart -->
                            <i class="fa-solid fa-trash cart-remove"></i>
                                                `;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox)
cartShopBox
.getElementsByClassName("cart-remove")[0]
.addEventListener('click', removeCartItem);
cartShopBox
.getElementsByClassName("cart-quantity")[0]
.addEventListener('change', quantityChanged);


//Update Total
function updatetotal(){
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        //cuando el precio contiene centavos
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    }
