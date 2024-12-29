// Datos del restaurante y platillos
const restaurantInfo = {
    name: "Italian Bistro",
    description: "A cozy place offering authentic Italian cuisine with a modern twist.",
    image: "images/restaurant.jpg",
    dishes: [
        {
            name: "Margherita Pizza",
            description: "Classic pizza with fresh tomatoes, mozzarella, and basil.",
            price: 12.99,
            image: "images/pizza.jpg"
        },
        {
            name: "Spaghetti Carbonara",
            description: "Traditional Italian pasta with creamy egg sauce and pancetta.",
            price: 14.99,
            image: "images/spaghetti.jpg"
        },
        {
            name: "Tiramisu",
            description: "A classic Italian dessert made with coffee-soaked ladyfingers and mascarpone cream.",
            price: 6.99,
            image: "images/tiramisu.jpg"
        }
    ]
};

// Función para cargar la información del restaurante
function loadRestaurantInfo() {
    // Actualizar la imagen, título y descripción
    document.getElementById('restaurant-image').src = restaurantInfo.image;
    document.getElementById('restaurant-title').textContent = restaurantInfo.name;
    document.getElementById('restaurant-description').textContent = restaurantInfo.description;
}

// Función para cargar los platillos
function loadDishes() {
    const dishesContainer = document.getElementById('dishes-container');
    dishesContainer.innerHTML = ''; // Limpiar contenido previo

    restaurantInfo.dishes.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.className = 'dish-card';

        dishCard.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <div class="info">
                <h3>${dish.name}</h3>
                <p>${dish.description}</p>
                <p class="price">$${dish.price.toFixed(2)}</p>
            </div>
            <button class="button-primary button-addtocart">Add to cart</button>
        `;

        dishesContainer.appendChild(dishCard);
    });
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    loadRestaurantInfo();
    loadDishes();
});
