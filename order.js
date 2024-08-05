document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let tableBody = document.querySelector('#orderTable tbody');
    let totalCostElement = document.querySelector('#totalCost');
    let orderForm = document.getElementById('orderForm');
    let confirmationMessage = document.getElementById('confirmationMessage');

    function renderOrder() {
        tableBody.innerHTML = ''; 

        let totalCost = 0;
        cart.forEach((item) => {
            let subtotal = item.price * item.quantity;
            totalCost += subtotal;

            let itemContainer = document.createElement('tr');
            itemContainer.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;"></td>
                <td>${item.name}</td>
                <td>Rs. ${item.price}</td>
                <td>${item.quantity}</td>
                <td>Rs. ${subtotal.toFixed(2)}</td>
            `;
            tableBody.appendChild(itemContainer);
        });

        totalCostElement.textContent = `Rs. ${totalCost.toFixed(2)}`;
    }

   
    renderOrder();

    
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();

        
        let name = document.getElementById('name').value;
        let address = document.getElementById('address').value;
        let payment = document.getElementById('payment').value;

        if (name && address && payment) {
            let deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 3);
            let deliveryDateString = `${deliveryDate.getDate()}/${deliveryDate.getMonth() + 1}/${deliveryDate.getFullYear()}`;

            confirmationMessage.innerHTML = `
                <p>Thank you for your purchase, ${name}!</p>
                <p>Your order will be delivered to ${address} by ${deliveryDateString}.</p>
            `;
            confirmationMessage.style.display = 'block';
            orderForm.style.display = 'none';
            localStorage.removeItem('cart');
        } else {
            alert('Please fill in all fields.');
        }
    });
});

