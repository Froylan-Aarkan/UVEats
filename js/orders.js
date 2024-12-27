//falta refinar
document.addEventListener("DOMContentLoaded", () => {
    const orders = [
        {
            foodName: "Pizza Margarita",
            quantity: 2,
            restaurant: "Italiano's",
            pickupLocation: { lat: 40.7128, lng: -74.0060 }, // Ejemplo: Nueva York
            deliveryLocation: { lat: 40.73061, lng: -73.935242 } // Ejemplo: Brooklyn
        },
        {
            foodName: "Tacos al Pastor",
            quantity: 5,
            restaurant: "El Mexicano",
            pickupLocation: { lat: 34.0522, lng: -118.2437 }, // Ejemplo: Los Ángeles
            deliveryLocation: { lat: 34.0407, lng: -118.2468 } // Ejemplo: Centro de Los Ángeles
        }
    ];

    const orderList = document.getElementById("order-list");
    const mapElement = document.getElementById("map");

    // Inicializar el mapa
    const map = new google.maps.Map(mapElement, {
        center: { lat: 40.7128, lng: -74.0060 }, // Coordenadas iniciales
        zoom: 10
    });

    orders.forEach(order => {
        // Crear elemento de pedido
        const orderItem = document.createElement("li");
        orderItem.className = "order-item";
        orderItem.innerHTML = `
            <strong>Food:</strong> ${order.foodName}<br>
            <strong>Quantity:</strong> ${order.quantity}<br>
            <strong>Restaurant:</strong> ${order.restaurant}<br>
            <strong>Pickup Location:</strong> (${order.pickupLocation.lat}, ${order.pickupLocation.lng})<br>
            <strong>Delivery Location:</strong> (${order.deliveryLocation.lat}, ${order.deliveryLocation.lng})<br>
            <button class="show-map">Show on Map</button>
        `;

        orderList.appendChild(orderItem);

        // Evento para mostrar ubicaciones en el mapa
        const button = orderItem.querySelector(".show-map");
        button.addEventListener("click", () => {
            map.setCenter(order.pickupLocation);
            map.setZoom(14);

            // Marcadores para la recolección y entrega
            new google.maps.Marker({
                position: order.pickupLocation,
                map,
                title: "Pickup Location"
            });

            new google.maps.Marker({
                position: order.deliveryLocation,
                map,
                title: "Delivery Location"
            });
        });
    });
});