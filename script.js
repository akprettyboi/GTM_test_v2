document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    // Add to Cart Functionality
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const product = this.closest(".product");
            const productId = product.getAttribute("data-id");
            const productName = product.querySelector("h3").innerText;
            const productPrice = parseFloat(product.getAttribute("data-price"));

            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }
            updateCart();
        });
    });

    // Update Cart Functionality
    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement("div");
            cartItem.innerHTML = `
                <p>${item.name} (x${item.quantity}) - ₹${itemTotal}</p>
                <button class="decrease-quantity" data-id="${item.id}">-</button>
                <button class="increase-quantity" data-id="${item.id}">+</button>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });

        totalPrice.innerText = total;
        cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);

        document.querySelectorAll(".increase-quantity").forEach(button => {
            button.addEventListener("click", function () {
                const itemId = this.getAttribute("data-id");
                const item = cart.find(item => item.id === itemId);
                if (item) item.quantity++;
                updateCart();
            });
        });

        document.querySelectorAll(".decrease-quantity").forEach(button => {
            button.addEventListener("click", function () {
                const itemId = this.getAttribute("data-id");
                const item = cart.find(item => item.id === itemId);
                if (item && item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart = cart.filter(i => i.id !== itemId);
                }
                updateCart();
            });
        });

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const itemId = this.getAttribute("data-id");
                cart = cart.filter(item => item.id !== itemId);
                updateCart();
            });
        });
    }

    // Checkout Functionality
    document.getElementById("checkout").addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert("Thank you for your purchase! Your order has been placed.");
        cart = [];
        updateCart();
    });

    // Login Form Handling
    document.getElementById("auth-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username && password) {
            alert(`Welcome, ${username}! You are now logged in.`);
        } else {
            alert("Please enter valid credentials.");
        }
    });
});
