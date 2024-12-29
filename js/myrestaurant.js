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
        }
    ]
};

// Mostrar vista previa de imágenes
function previewImage(inputElement, previewElement) {
    const file = inputElement.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewElement.src = e.target.result;
            previewElement.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        previewElement.style.display = 'none';
    }
}

// Cargar información del restaurante
function loadRestaurantInfo() {
    document.getElementById('restaurant-name').value = restaurantInfo.name;
    document.getElementById('restaurant-description-input').value = restaurantInfo.description;
    const preview = document.getElementById('restaurant-image-preview');
    preview.src = restaurantInfo.image;
    preview.style.display = 'block';
}

// Guardar cambios del restaurante
document.getElementById('restaurant-info-form').addEventListener('submit', (e) => {
    e.preventDefault();

    restaurantInfo.name = document.getElementById('restaurant-name').value;
    restaurantInfo.description = document.getElementById('restaurant-description-input').value;

    const fileInput = document.getElementById('restaurant-image-input');
    if (fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            restaurantInfo.image = e.target.result;
            alert('Restaurant information updated!');
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        alert('Restaurant information updated!');
    }
});

// Cargar platillos
function loadDishes() {
    const dishesContainer = document.getElementById('dishes-container');
    dishesContainer.innerHTML = '';

    restaurantInfo.dishes.forEach((dish, index) => {
        const dishCard = document.createElement('div');
        dishCard.className = 'dish-card';

        dishCard.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <div class="info">
                <h3>${dish.name}</h3>
                <p>${dish.description}</p>
                <p class="price">$${dish.price.toFixed(2)}</p>
                <button class="button-primary" onclick="deleteDish(${index})">Delete</button>
            </div>
        `;

        dishesContainer.appendChild(dishCard);
    });
}

// Agregar nuevo platillo
document.getElementById('new-dish-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const newDish = {
        name: document.getElementById('dish-name').value,
        description: document.getElementById('dish-description').value,
        price: parseFloat(document.getElementById('dish-price').value),
        image: ""
    };

    const fileInput = document.getElementById('dish-image-input');
    if (fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            newDish.image = e.target.result;
            restaurantInfo.dishes.push(newDish);
            loadDishes();
            e.target.reset();
            alert('New dish added!');
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
});

// Eliminar platillo
function deleteDish(index) {
    restaurantInfo.dishes.splice(index, 1);
    loadDishes();
}

// Inicializar página
document.addEventListener('DOMContentLoaded', () => {
    loadRestaurantInfo();
    loadDishes();

    // Vista previa de imágenes
    document.getElementById('restaurant-image-input').addEventListener('change', (e) => {
        previewImage(e.target, document.getElementById('restaurant-image-preview'));
    });

    document.getElementById('dish-image-input').addEventListener('change', (e) => {
        previewImage(e.target, document.getElementById('dish-image-preview'));
    });
});