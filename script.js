console.log("JolliOrder website loaded successfully!");

const buttons = document.querySelectorAll(".add-to-cart");

const cartItems = document.getElementById("cart-items");

const cartTotal = document.getElementById("cart-total");

const checkoutButton = document.getElementById("checkout-button");

const paymentModal = document.getElementById("payment-modal");

const closePayment = document.getElementById("close-payment");

const paymentTotal = document.getElementById("payment-total");

const placeOrder = document.getElementById("place-order");

const loadingModal = document.getElementById("loading-modal");

const progressBar = document.getElementById("progress-bar");

const progressText = document.getElementById("progress-text");

const successModal = document.getElementById("success-modal");

const doneButton = document.getElementById("done-button");

let cart = [];

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        const card = button.closest(".food-card");

        const name = card.dataset.name;

        const price = Number(card.dataset.price);

        const existingItem = cart.find(function(item) {
            return item.name === name;
        });

        if (existingItem) {

            existingItem.quantity += 1;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        displayCart();

    });

});


function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.textContent = "Your cart is currently empty.";

        cartItems.appendChild(emptyMessage);

    }

    cart.forEach(function(item) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        const paragraph = document.createElement("p");

        paragraph.textContent =
            `${item.name} x${item.quantity} - ₱${itemTotal.toFixed(2)}`;

        cartItems.appendChild(paragraph);

    });

    cartTotal.textContent = total.toFixed(2);

}


checkoutButton.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    paymentTotal.textContent = cartTotal.textContent;

    paymentModal.style.display = "flex";

});


closePayment.addEventListener("click", function() {

    paymentModal.style.display = "none";

});


placeOrder.addEventListener("click", function() {

    const selectedPayment = document.querySelector(
        'input[name="payment"]:checked'
    );

    if (!selectedPayment) {

        alert("Please choose a payment method.");

        return;

    }

    paymentModal.style.display = "none";

    loadingModal.style.display = "flex";

    progressBar.style.width = "0%";

    progressText.textContent = "0";

    let progress = 0;

    const loading = setInterval(function() {

        progress++;

        progressBar.style.width = progress + "%";

        progressText.textContent = progress;

        if (progress >= 100) {

            clearInterval(loading);

            setTimeout(function() {

                loadingModal.style.display = "none";

                successModal.style.display = "flex";

            }, 500);

        }

    }, 30);

});


doneButton.addEventListener("click", function() {

    successModal.style.display = "none";

    cart = [];

    displayCart();

});