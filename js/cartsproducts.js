let productInCart = JSON.parse(localStorage.getItem("productInCart"));
let allProducts = document.querySelector(".productsInCart");
let totalPriceDisplay = document.querySelector("#totalPrice");

// Create product items in the cart
if (productInCart) {
    createProductInCart(productInCart);
}
// Function to create product items in the cart
function createProductInCart(products) {
    let totalPrice = 0;
    let productHTML = products.map(item => {
        let price = parseFloat(item.cash.replace('$' , ''))
        totalPrice += price * item.quantity;
        return `
        <div class="product-item-cart">
            <div class="product-item-img-cart">
                <img src="${item.imageUrl}" alt="${item.name}">
            </div>
            <div class="product-details-cart">
                <div class="item">
                    <span class="key">Product :</span>
                    <span id="product-name" style="color: #d33682;">${item.name}</span>
                </div>
                <div class="item">
                    <span class="key">Price :</span>
                    <span style="color: #d33682;">${item.cash}</span>
                </div>
                <div class="item">
                    <span class="key">Category :</span>
                    <span id="product-category" style="color: #d33682;">${item.categoryName}</span>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-product-id="${item.id}">-</button>
                    <span class="quantity" style="color: #d33682;">${item.quantity}</span>
                    <button class="quantity-btn plus" data-product-id="${item.id}">+</button>
                    <button class="btn btn-danger cart-remove-product" onclick="removeProduct(${item.id})">Remove</button>
                </div>
            </div>
        </div>
        `;
    }).join('');
    totalPriceDisplay.innerHTML = "<span style='color: #d33682;'>Total Price :</span> " +  totalPrice.toFixed(2) +" $";
    allProducts.innerHTML = productHTML;
}

allProducts.addEventListener("click", function(event) {
    if (event.target.classList.contains("minus")) {
        let productId = event.target.getAttribute("data-product-id");
        updateQuantity(productId, -1);
    } else if (event.target.classList.contains("plus")) {
        let productId = event.target.getAttribute("data-product-id");
        updateQuantity(productId, 1);
    }
});

// Function to update quantity of a product in the cart
function updateQuantity(id, change) {
    let product = productInCart.find(item => item.id == id);
    if (product) {
        product.quantity += change;
        if (product.quantity < 1) {
            removeProduct(id);
        } else {
            localStorage.setItem("productInCart", JSON.stringify(productInCart));
            createProductInCart(productInCart);
        }
    }
}

// Function to remove a product from the cart
function removeProduct(id) {
    productInCart = productInCart.filter(item => item.id != id);
    localStorage.setItem("productInCart", JSON.stringify(productInCart));
    createProductInCart(productInCart);
}

/////////////////////////////////////////////////////////////////////////////
let favProducts = localStorage.getItem("favProducts");
let allFavorites = document.querySelector(".favorites");

if (favProducts) {
    let favItem = JSON.parse(favProducts);
    createFavoriteProducts(favItem);
}

function createFavoriteProducts(favorite) {
    let z = '';
    favorite.forEach((item) => {
        const heartIconClass = getHeartIconClass(item.id);
        const heartColor = heartIconClass === "fa-solid" ? "red" : "";

        z += `<div class="favoriteInCart">
                    <div class="favotite-item-cart">
                        <div class="favotite-item-img-cart">
                            <img src="${item.imageUrl}" alt="${item.name}">
                        </div>
                        <div class="favotite-details-cart">
                            <div class="item">
                                <span class="key">Product :</span>
                                <span id="product-name" style="color: #d33682;">${item.name}</span>
                            </div>
                            <div class="item">
                                <span class="key">Category :</span>
                                <span id="product-category" style="color: #d33682;">${item.categoryName}</span>
                            </div>
                        </div>
                        <div class="fav-item-choise">
                             <i class="fa-heart love ${heartIconClass}" style="color: ${heartColor}" onClick="removeFromFavorites(${item.id})"></i>
                        </div>
                    </div>
                </div>`;
    });
    
    // Check if there are only three items or less
    if (favorite.length <= 3) {
        allFavorites.style.justifyContent = "center";
        allFavorites.style.animation = "none";
    } else {
        z = z + z + z;
    }

    allFavorites.innerHTML = z;
}

function getHeartIconClass(id) {
    let favProducts = JSON.parse(localStorage.getItem("favProducts")) || [];
    let index = favProducts.findIndex(item => item.id === id);
    return index != -1 ? "fa-solid" : "fa-regular";
}

function removeFromFavorites(id){
    let favProducts = JSON.parse(localStorage.getItem("favProducts"))
    favProducts = favProducts.filter(item => item.id != id)
    localStorage.setItem("favProducts" , JSON.stringify(favProducts))
    createFavoriteProducts(favProducts)
}