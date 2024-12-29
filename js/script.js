//Close buttons
const closeButtons = document.querySelectorAll('.close');

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetForm = document.getElementById(button.getAttribute('data-target'));
    targetForm.style.display = 'none';
  });
});

//Login
const loginLink = document.getElementById('loginLink');
const loginForm = document.getElementById('loginForm');

loginLink.addEventListener('click', (event) => {
  event.preventDefault();
  loginForm.style.display = 'flex';
});

window.addEventListener('click', (event) => {
  if (event.target === loginForm) {
    loginForm.style.display = 'none';
  }
});

//Signup
const signupLink = document.getElementById('signupLink');
const signupForm = document.getElementById('signupForm');

signupLink.addEventListener('click', (event) => {
  event.preventDefault();
  signupForm.style.display = 'flex';
});

window.addEventListener('click', (event) => {
  if (event.target === signupForm) {
    signupForm.style.display = 'none';
  }
});

//switch links
document.getElementById('showSignup').addEventListener('click', (e) => {
  e.preventDefault();
  hideModal('loginForm');
  showModal('signupForm');
});
  
document.getElementById('showLogin').addEventListener('click', (e) => {
  e.preventDefault();
  hideModal('signupForm');
  showModal('loginForm');
});

//Map
let map, marker;

function initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiMWZyYW50ei1qLXJpdmVyYTEiLCJhIjoiY201OG51YmZqM3l2ZzJxcGt5NXU5bWpubCJ9.gU18fVsy1j9FPtuKynhSNQ';

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-96.92370, 19.52645],
        zoom: 9
    });
    let marker = new mapboxgl.Marker({
        draggable: true
    })
    .setLngLat([-96.92370, 19.52645])
    .addTo(map);
    marker.on('dragend', function() {
        const lngLat = marker.getLngLat();
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=pk.eyJ1IjoiMWZyYW50ei1qLXJpdmVyYTEiLCJhIjoiY201OG51YmZqM3l2ZzJxcGt5NXU5bWpubCJ9.gU18fVsy1j9FPtuKynhSNQ`;
        fetch(url)
        .then(response=>response.json())
        .then(data=> {
            const place = data.features[0]?.place_name;
            if(place){
                console.log("Selected location:", place);
                document.getElementById("locationLabel").textContent = `Location: ${place}`;
            }else{
                console.log("Selected location:", lngLat.lng, lngLat.lat);
                document.getElementById("locationLabel").textContent = `Lat: ${lngLat.lat.toFixed(5)}, Lng: ${lngLat.lng.toFixed(5)}`;
            }
        })
        .catch(error => {
            console.error('Error obtaining the location:', error);
            document.getElementById("locationLabel").textContent = `Lat: ${lngLat.lat.toFixed(5)}, Lng: ${lngLat.lng.toFixed(5)}`;
        });
    });
}

document.getElementById("locationLink").addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("mapModal").style.display = "flex";
  initMap();
});

document.getElementById("confirmLocation").addEventListener("click", () => {
  const position = marker.getPosition();
  const lat = position.lat().toFixed(5);
  const lng = position.lng().toFixed(5);
  document.getElementById("locationLabel").textContent = `Lat: ${lat}, Lng: ${lng}`;
  document.getElementById("mapModal").style.display = "none";
});
// Cerrar modal cuando se hace clic fuera del contenido
window.addEventListener("click", (event) => {
    const mapModal = document.getElementById("mapModal");
    if (event.target === mapModal) {
        mapModal.style.display = "none";
    }
});

//Restaurant Filters
// Obtener todos los filtros de categorías y restaurantes
const categoryElements = document.querySelectorAll('.category');
const restaurantElements = document.querySelectorAll('.restaurant');
let activeCategory = null; // Para rastrear el filtro activo

// Añadir evento de clic a cada filtro de categoría
categoryElements.forEach(category => {
    category.addEventListener('click', () => {
        const selectedCategory = category.querySelector('p').textContent;

        // Si el mismo filtro se selecciona nuevamente, se desactiva (para ver todos los restaurantes)
        if (activeCategory === selectedCategory) {
            activeCategory = null;
            categoryElements.forEach(c => c.classList.remove('selected'));
            restaurantElements.forEach(restaurant => restaurant.style.display = 'flex');
            return;
        }

        // Actualizar la categoría activa y resaltar el filtro seleccionado
        activeCategory = selectedCategory;
        categoryElements.forEach(c => c.classList.remove('selected'));
        category.classList.add('selected');

        // Mostrar u ocultar restaurantes según la categoría seleccionada
        restaurantElements.forEach(restaurant => {
            const restaurantCategories = restaurant.getAttribute('data-category').split(', ');
            if (restaurantCategories.includes(selectedCategory)) {
                restaurant.style.display = 'flex';
            } else {
                restaurant.style.display = 'none';
            }
        });
    });
});

//Search-bar
// Seleccionar la barra de búsqueda y todos los restaurantes
const searchInput = document.querySelector('.search-bar input');

// Agregar evento de entrada a la barra de búsqueda
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase(); // Obtener y convertir a minúsculas el término de búsqueda

    restaurantElements.forEach(restaurant => {
        const restaurantName = restaurant.querySelector('.restaurant-info h3').textContent.toLowerCase();

        // Mostrar el restaurante si el nombre contiene el término de búsqueda
        if (restaurantName.includes(searchTerm)) {
            restaurant.style.display = 'flex';
        } else {
            restaurant.style.display = 'none';
        }
    });
});

//Cart
const cart = [];
const cartModal = document.getElementById("cartModal");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");
const emptyCartMessage = document.getElementById("emptyCartMessage");

// Función para actualizar el carrito en la interfaz
function updateCartDisplay() {
    cartItemsContainer.innerHTML = ""; // Limpiar el contenedor
    let total = 0;

    if (cart.length === 0) {
        emptyCartMessage.style.display = "block";
    } else {
        emptyCartMessage.style.display = "none";
        cart.forEach((item, index) => {
            total += item.price;

            // Crear un elemento para cada producto en el carrito
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Eliminar</button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });
    }

    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Función para agregar un producto al carrito
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartDisplay();
}

// Función para eliminar un producto específico del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Vaciar el carrito
document.getElementById("clearCartButton").addEventListener("click", () => {
    cart.length = 0; // Vaciar el array
    updateCartDisplay();
});

// Mostrar el carrito
document.querySelector('.cart-link').addEventListener('click', (event) => {
    event.preventDefault();
    cartModal.style.display = 'flex';
    updateCartDisplay();
});

// Cerrar el carrito al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Funcionalidad de pagar (puedes personalizarla según lo que quieras hacer)
document.getElementById("checkoutButton").addEventListener("click", () => {
    alert("Gracias por tu compra!");
    cart.length = 0; // Vaciar el carrito después de pagar
    updateCartDisplay();
    cartModal.style.display = 'none';
});