document.addEventListener("DOMContentLoaded", () => {
    // Configuración inicial de Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoiMWZyYW50ei1qLXJpdmVyYTEiLCJhIjoiY201OG51YmZqM3l2ZzJxcGt5NXU5bWpubCJ9.gU18fVsy1j9FPtuKynhSNQN';
    const map = new mapboxgl.Map({
        container: 'map', // Contenedor del mapa
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-96.92370, 19.52645], // Coordenadas iniciales
        zoom: 3
    });

    const orders = [
        {
            foodName: "Pizza Margarita",
            quantity: 2,
            restaurant: "Italiano's",
            pickupLocation: { address: "123 Main St, New York, NY", coordinates: [-74.0060, 40.7128] },
            deliveryLocation: { address: "456 Park Ave, Brooklyn, NY", coordinates: [-73.935242, 40.73061] }
        },
        {
            foodName: "Tacos al Pastor",
            quantity: 5,
            restaurant: "El Mexicano",
            pickupLocation: { address: "789 Sunset Blvd, Los Angeles, CA", coordinates: [-118.2437, 34.0522] },
            deliveryLocation: { address: "123 Hollywood Blvd, Los Angeles, CA", coordinates: [-118.2468, 34.0407] }
        }
    ];

    const orderList = document.getElementById("order-list");

    // Mostrar pedidos en la lista
    orders.forEach(order => {
        const orderItem = document.createElement("li");
        orderItem.className = "order-item";
        orderItem.innerHTML = `
            <strong>Food:</strong> ${order.foodName}<br>
            <strong>Quantity:</strong> ${order.quantity}<br>
            <strong>Restaurant:</strong> ${order.restaurant}<br>
            <strong>Pickup Location:</strong> ${order.pickupLocation.address}<br>
            <strong>Delivery Location:</strong> ${order.deliveryLocation.address}<br>
            <button class="button-primary show-map">Show on Map</button>
        `;

        // Agregar funcionalidad para mostrar en el mapa
        orderItem.querySelector(".show-map").addEventListener("click", () => {
            // Centrar el mapa y agregar marcadores
            map.flyTo({
                center: order.pickupLocation.coordinates,
                zoom: 10
            });

            // Limpiar marcadores previos
            document.querySelectorAll('.mapboxgl-marker').forEach(marker => marker.remove());

            // Agregar marcador para la ubicación de recogida
            new mapboxgl.Marker({ color: 'blue' })
                .setLngLat(order.pickupLocation.coordinates)
                .setPopup(new mapboxgl.Popup().setText(`Pickup: ${order.pickupLocation.address}`))
                .addTo(map);

            // Agregar marcador para la ubicación de entrega
            new mapboxgl.Marker({ color: 'red' })
                .setLngLat(order.deliveryLocation.coordinates)
                .setPopup(new mapboxgl.Popup().setText(`Delivery: ${order.deliveryLocation.address}`))
                .addTo(map);
        });

        orderList.appendChild(orderItem);
    });
});
