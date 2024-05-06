let allProducts = document.querySelector(".products");
let cartsProductsDiv = document.querySelector(".carts_products div");
let badge = document.querySelector(".badge");
let addItem = localStorage.getItem("productInCart") ? JSON.parse(localStorage.getItem("productInCart")) : [];

let favorites = document.querySelector(".favorites")
let favItem = localStorage.getItem("favProducts") ? JSON.parse(localStorage.getItem("favProducts")) : [];

let products = [{id:1,title:"Product :",name:"T-Shirt adiddas",price:"Price :",cash:"80 $",category:"Category :",categoryName:"Fashion",imageUrl:"images/Puma-Mens-Regular-T-Shirt.jpg"},
                {id:2,title:"Product :",name:"Jacket",price:"Price :",cash:"220 $",category:"Category :",categoryName:"Fashion",imageUrl:"images/Jacket.jpg"},
                {id:3,title:"Product :",name:"Earpods",price:"Price :",cash:"150 $",category:"Category :",categoryName:"phone accessories",imageUrl:"images/Headphones-in-Ear.jpg"},
                {id:4,title:"Product :",name:"Glasses",price:"Price :",cash:"770 $",category:"Category :",categoryName:"Men accessories",imageUrl:"images/glasses-2.jpeg"},
                {id:5,title:"Product :",name:"Adidas bottle",price:"Price :",cash:"180 $",category:"Category :",categoryName:"Sport",imageUrl:"images/adidas_after_shave.jpg"},
                {id:6,title:"Product :",name:"Cap",price:"Price :",cash:"80 $",category:"Category :",categoryName:"Men accessories",imageUrl:"images/baseball-cap.jpg"},
                {id:7,title:"Product :",name:"Bag adiddas",price:"Price :",cash:"80 $",category:"Category :",categoryName:"Bags",imageUrl:"images/adidas-sport-sports-bags.jpg"},
                {id:8,title:"Product :",name:"Shoes adiddas",price:"Price :",cash:"1200 $",category:"Category :",categoryName:"Sport",imageUrl:"images/shoes.jpeg"},
                {id:9,title:"Product :",name:"Bag",price:"Price :",cash:"100 $",category:"Category :",categoryName:"Fashion",imageUrl:"images/Bag.jpeg"}
            ];

// Function to filter products based on search input and selected option
function filterProducts(searchTerm, searchOption) {
    searchTerm = searchTerm.toLowerCase();
    let filteredProducts = products.filter(product => {
        if (searchOption === 'name') {
            return product.name.toLowerCase().includes(searchTerm);
        } else if (searchOption === 'category') {
            return product.categoryName.toLowerCase().includes(searchTerm);
        }
    });
    return filteredProducts;
}

// Function to handle search dynamically as the user types
function handleSearch() {
    let searchOption = document.getElementById('search-items').value;
    let searchTerm = document.getElementById('search-input').value;
    let filteredProducts = filterProducts(searchTerm, searchOption);
    renderFilteredProducts(filteredProducts);
}
// Function to render filtered products
function renderFilteredProducts(filteredProducts) {
    let html = filteredProducts.map(product => {
        let heartIconClass = getHeartIconClass(product.id);
        let addButtonClass = getAddButtonClass(product.id)
        return `
            <div class="product-item">
                <img src="${product.imageUrl}" alt="${product.name}" class="product-item-img">
                <div class="product-item-desc">
                    <div class="item">
                        <span class="key">Product :</span>
                        <span id="product-name">${product.name}</span>
                    </div>
                    <div class="item">
                        <span class="key">Price :</span>
                        <span>${product.cash}</span>
                    </div>
                    <div class="item">
                        <span class="key">Category :</span>
                        <span id="product-category">${product.categoryName}</span>
                    </div>
                </div>
                <div class="product-item-choise">
                    <button class="add-cart btn ${addButtonClass.class}" data-product-id="${product.id}" onClick="toggleButton(this , ${product.id})">${addButtonClass.textContent}</button>
                    <i class="fa-heart love ${heartIconClass.class}" style="color: ${heartIconClass.color}" onClick="addToFavorites(this ,${product.id})"></i>
                </div>
            </div>`;
    }).join('');

    allProducts.innerHTML = html;

    // Adjusting container style based on the number of filtered products
    if (filteredProducts.length === 1) {
        allProducts.style.justifyContent = 'center';
    } else {
        allProducts.style.justifyContent = 'space-around';
    }
}
// --------------------------------------------------------------------------//

// Function to toggle button text and class
function toggleButton(button , productId) {
    if (button.textContent === "Add To Cart") {
        button.textContent = "Remove from Cart";
        button.classList.remove('btn-primary');
        button.classList.add('btn-danger');
        addToCart(productId)
    } else {
        button.textContent = "Add To Cart";
        button.classList.remove('btn-danger');
        button.classList.add('btn-primary');
        removeFromCart(productId);
    }
}

function getAddButtonClass(id){
    let productInCart = JSON.parse(localStorage.getItem("productInCart")) || [];
    let index = productInCart.findIndex(item => item.id === id);
    if(index != -1) {
        return {class :"btn-danger" , textContent : "Remove from Cart"}
    }
    else {
        return {class :"btn-primary" , textContent : "Add To Cart"}
    }
}

function removeFromCart(id) {
    let productInCart = JSON.parse(localStorage.getItem("productInCart"));
    let productIndex = productInCart.findIndex(item => item.id === id);

    if (productIndex !== -1) {
        productInCart.splice(productIndex, 1);
        localStorage.setItem("productInCart", JSON.stringify(productInCart));
        let productItemToRemove = document.querySelector(`.product-details[data-product-id="${id}"]`);
        if (productItemToRemove) {
            productItemToRemove.remove();
            addItem = productInCart;
            updateCartCounter();
            updateCartDisplay();
        }
    }
}

// Initial rendering of all products
renderFilteredProducts(products);

// Load saved products and recreate quantity controls
if (addItem) {
    addItem.forEach(item => {
        let productDetails = document.createElement("div");
        productDetails.classList.add("product-details");
        productDetails.innerHTML = `
            <p>${item.name}</p>
            <div class="quantity-controls">
                <button class="quantity-btn minus">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus">+</button>
            </div>
        `;
        let quantitySpan = productDetails.querySelector(".quantity");
        let minusBtn = productDetails.querySelector(".minus");
        let plusBtn = productDetails.querySelector(".plus");

        minusBtn.addEventListener("click", function() {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
                updateQuantity(item.id, quantity);
            } else {
                removeProduct(item.id);
                productDetails.remove();
            }
            updateCartCounter();
        });
        
        plusBtn.addEventListener("click", function() {
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;
            quantitySpan.textContent = quantity;
            updateQuantity(item.id, quantity);
            updateCartCounter();
        });

        cartsProductsDiv.appendChild(productDetails);
    });
    updateCartCounter();
}

// Function to add a product to the cart
function addToCart(id) {
    if (localStorage.getItem("firstName")) {
        let choosenProduct = products.find((item) => item.id === id);
        addItem.push({ 
            id: choosenProduct.id, 
            name: choosenProduct.name, 
            price: choosenProduct.price, 
            cash: choosenProduct.cash, 
            category: choosenProduct.category, 
            categoryName: choosenProduct.categoryName, 
            imageUrl : choosenProduct.imageUrl,
            quantity: 1 
        });
        localStorage.setItem("productInCart", JSON.stringify(addItem));
        updateCartDisplay();
    } else {
        window.location = "login.html";
    }
}

// Function to update the cart display
function updateCartDisplay() {
    cartsProductsDiv.innerHTML = "";
    addItem.forEach(item => {
        let productDetails = document.createElement("div");
        productDetails.classList.add("product-details");
        productDetails.dataset.productId = item.id;
        productDetails.innerHTML = `
            <p>${item.name}</p>
            <div class="quantity-controls">
                <button class="quantity-btn minus">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus">+</button>
            </div>
        `;
        let quantitySpan = productDetails.querySelector(".quantity");
        let minusBtn = productDetails.querySelector(".minus");
        let plusBtn = productDetails.querySelector(".plus");

        minusBtn.addEventListener("click", function() {
            let quantity = parseInt(quantitySpan.textContent);
            let btn = document.querySelector(`.add-cart[data-product-id="${item.id}"]`);
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
                updateQuantity(item.id, quantity);
                updateCartCounter();
            } else {
                removeProduct(item.id);
                productDetails.remove();
                updateCartCounter();
                toggleButton(btn , item.id);
            }
        });
        
        plusBtn.addEventListener("click", function() {
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;
            quantitySpan.textContent = quantity;
            updateQuantity(item.id, quantity);
            updateCartCounter();

        });

        cartsProductsDiv.appendChild(productDetails);
    });
    updateCartCounter();
}

// Function to update the visibility of the cart products div based on the cart content
function updateCartVisibility() {
    if (addItem.length === 0) {
        document.querySelector(".carts_products").style.display = "none";
    }
     else {
        document.querySelector(".carts_products").style.display = "block";
    }
}

updateCartDisplay();

// Function to update the quantity of a product in the cart
function updateQuantity(id, quantity) {
    let product = addItem.find((item) => item.id === id);
    if (product) {
        product.quantity = quantity;
        localStorage.setItem("productInCart", JSON.stringify(addItem));
    }
}

// Function to update the cart counter
function updateCartCounter() {
    let cartsProductsCounter = addItem.reduce((total, item) => total + item.quantity, 0);
    badge.style.display = "block";
    badge.innerHTML = cartsProductsCounter;
}

// Function to remove a product from the cart
function removeProduct(id) {
    addItem = addItem.filter(item => item.id !== id);
    localStorage.setItem("productInCart", JSON.stringify(addItem));
    updateCartCounter();
}


let shoppingCartIcon = document.querySelector("#cart-icon");
let cartsProducts = document.querySelector(".carts_products");

shoppingCartIcon.addEventListener("click", toggleCart);

function toggleCart() {
    if (cartsProductsDiv.innerHTML !== "") {
        if (cartsProducts.style.display === "block") {
            cartsProducts.style.display = "none";
            // Change icon to down arrow
            shoppingCartIcon.classList.remove("fa-caret-up");
            shoppingCartIcon.classList.add("fa-caret-down");
        } else {
            cartsProducts.style.display = "block";
            // Change icon to up arrow
            shoppingCartIcon.classList.remove("fa-caret-down");
            shoppingCartIcon.classList.add("fa-caret-up");
        }
    }
}

function addToFavorites(icon, id) {
    if (localStorage.getItem("firstName")) {
        let index = favItem.findIndex(item => item.id === id);
        
        if (index === -1) {
            let choosenFavProducts = products.find(item => item.id === id);
            favItem.push(choosenFavProducts);
            localStorage.setItem("favProducts", JSON.stringify(favItem));
            localStorage.setItem(`iconState_${id}`, "solid");
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
            icon.style.color = "red";
        } else {
            favItem.splice(index, 1);
            localStorage.setItem("favProducts", JSON.stringify(favItem));
            localStorage.removeItem(`iconState_${id}`);
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
            icon.style.color = "";
        }
    } else {
        window.location = "login.html";
    }
}
 
function getHeartIconClass(id) {
    let favProducts = JSON.parse(localStorage.getItem("favProducts")) || [];
    let index = favProducts.findIndex(item => item.id === id);
    let iconState = localStorage.getItem(`iconState_${id}`);
    if (index !== -1 && iconState === "solid") {
        return { class: "fa-solid", color: "red" };
    } else {
        return { class: "fa-regular", color: "" };
    }
}