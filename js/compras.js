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
    var removeCartButtons = document.getElementsByClassName("cart-remove")
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++){ 
        var button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem) 
    }
    //Cambios en las cantidades
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs [i]
        input.addEventListener("change", quantityChanged);
    }
    //agregando al carrito
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i]
        button.addEventListener("click", addCartClicked);
    }
}

//removiendo items del carrito
function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updatetotal();
}
// Cambios en la cantidad
function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1; 
    }
    updatetotal();
}
//Agregar al carrito
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}
function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("product-title");
    for (var i = 0; i < cartItemsNames.length; i++){
        alert ("¿Querés agregar este Item al carrito?");
        return; 
    }
    
}
var cartBoxContent = `
                        <img src="../multimedia/shop/shop1.webp" class="product-img" alt="">
                        <div class="des">
                            <span>Vida Diaria</span>
                            <h5 class="product-title">Cocina Completa</h5>
                            <h4 class="price">$14000</h4>
                        </div>
                        <a href="#"><i id="cart" class="fa-solid fa-cart-shopping add-cart" ></i></a>
                        </div>`;
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
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        //cuando el precio contiene centavos
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    }
}