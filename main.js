document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners to "Add to Cart" buttons
    let addToCartButtons = document.getElementsByClassName('addtobutton');
    for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener('click', addToCart);
    }

    // Handle "View Cart" button click
    document.getElementById('viewCart').addEventListener('click', () => {
        window.location.href = 'cart.html';
    });
});

function addToCart(event) {
    let btn = event.target;
    let btnParent = btn.parentElement;
    let itemImage = btnParent.children[0].src;
    let itemName = btnParent.children[1].innerText;
    let itemPrice = btnParent.children[2].innerText.replace('Rs', '').trim();;
    let quantityInput = btnParent.querySelector('input');
    let quantity = parseFloat(quantityInput.value, 10);

    // Validate quantity input
    if (isNaN(quantity) || quantity < 0) {
        alert('Please enter a valid quantity.');
        return;
    }

    // Create an object to store item details
    let item = {
        name: itemName,
        price: itemPrice,
        image: itemImage,
        quantity: quantity
    };

    // Retrieve current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already exists in the cart
    let existingItemIndex = cart.findIndex(cartItem => cartItem.name === itemName);
    if (existingItemIndex > -1) {
        // Update quantity of the existing item
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to the cart
        cart.push(item);
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Notify the user
    alert('Item added to cart!');
}


