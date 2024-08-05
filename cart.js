document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let tableBody = document.querySelector('#cartTable tbody');
    let totalCostElement = document.querySelector('#totalCost'); // Element to display total cost

    // Function to render items
    function renderCart() {
        tableBody.innerHTML = ''; // Clear existing rows

        cart.forEach((item, index) => {
            let itemContainer = document.createElement('tr');
            itemContainer.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;"></td>
                <td>${item.name}</td>
                <td>Rs. ${item.price}</td>
                <td><input type="number" class="quantity-input" data-index="${index}" value="${item.quantity}" min="1"></td>
                <td>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                    <button class="update-btn" data-index="${index}">Update</button>
                </td>
            `;
            tableBody.appendChild(itemContainer);
        });

        // Update total cost
        updateTotalCost();
    }

    // Render items on page load
    renderCart();

    // Handle remove and update button clicks
    tableBody.addEventListener('click', (event) => {
        let index = event.target.getAttribute('data-index');

        if (event.target.classList.contains('remove-btn')) {
            removeItem(index);
        } else if (event.target.classList.contains('update-btn')) {
            updateItemQuantity(index);
        }
    });

    // Function to remove an item
    function removeItem(index) {
        cart.splice(index, 1); // Remove item from array
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        renderCart(); // Re-render cart
    }

    // Function to update item quantity
    function updateItemQuantity(index) {
        let quantityInput = document.querySelector(`.quantity-input[data-index="${index}"]`);
        let newQuantity = parseInt(quantityInput.value, 10);

        if (isNaN(newQuantity) || newQuantity < 1) {
            alert('Quantity must be a number and at least 1.');
            return;
        }

        cart[index].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        renderCart(); // Re-render cart
    }

    // Function to update total cost
    function updateTotalCost() {
        let totalCost = cart.reduce((sum, item) => {
            let price = item.price;
            let quantity = item.quantity;

            console.log(`Item: ${item.name}, Price: ${price}, Quantity: ${quantity}`); // Debug logging

            if (isNaN(price) || isNaN(quantity)) {
                console.error(`Invalid price or quantity for item: ${item.name}`);
                return sum;
            }

            return sum + (price * quantity);
        }, 0);
        totalCostElement.textContent = `Rs. ${totalCost.toFixed(2)}`;
    }

    // Function to add the cart items to favourites (local storage)
    function addToFavourites() {
        localStorage.setItem('favouriteCartItems', JSON.stringify(cart));
        alert('Cart items added to favourites.');
    }

    // Function to apply the favourite cart items from local storage
    function applyFavourites() {
        const favouriteItems = JSON.parse(localStorage.getItem('favouriteCartItems'));

        if (favouriteItems && favouriteItems.length > 0) {
            cart = favouriteItems;
            localStorage.setItem('cart', JSON.stringify(cart)); // Update the main cart with favourite items
            renderCart(); // Re-render cart with favourite items
            alert('Favourite items applied to cart.');
        } else {
            alert('No favourite items found.');
        }
    }

    // Function to clear the cart
    function clearCart() {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        renderCart(); // Re-render cart
        alert('Cart cleared.');
    }

    // Event listeners for the Add to Favourites, Apply Favourites, and Clear Cart buttons
    document.querySelector('#addToFavouritesBtn').addEventListener('click', addToFavourites);
    document.querySelector('#applyFavouritesBtn').addEventListener('click', applyFavourites);
    document.querySelector('#clearCartBtn').addEventListener('click', clearCart);
});
