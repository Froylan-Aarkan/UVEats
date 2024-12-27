document.addEventListener("DOMContentLoaded", () => {
    const orders = [
        {
            foodName: "Pizza Margarita",
            quantity: 2,
            restaurant: "Italiano's",
            pickupLocation: "123 Main St, New York, NY",
            deliveryLocation: "456 Park Ave, Brooklyn, NY"
        },
        {
            foodName: "Tacos al Pastor",
            quantity: 5,
            restaurant: "El Mexicano",
            pickupLocation: "789 Sunset Blvd, Los Angeles, CA",
            deliveryLocation: "123 Hollywood Blvd, Los Angeles, CA"
        }
    ];

    const orderList = document.getElementById("order-list");

    orders.forEach(order => {
        // Crear elemento de pedido
        const orderItem = document.createElement("li");
        orderItem.className = "order-item";
        orderItem.innerHTML = `
            <strong>Food:</strong> ${order.foodName}<br>
            <strong>Quantity:</strong> ${order.quantity}<br>
            <strong>Restaurant:</strong> ${order.restaurant}<br>
            <strong>Pickup Location:</strong> ${order.pickupLocation}<br>
            <strong>Delivery Location:</strong> ${order.deliveryLocation}
        `;

        orderList.appendChild(orderItem);
    });
});