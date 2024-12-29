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

// Cerrar modal cuando se hace clic fuera del contenido
window.addEventListener("click", (event) => {
    const mapModal = document.getElementById("mapModal");
    if (event.target === mapModal) {
        mapModal.style.display = "none";
    }
});

// Variables globales
const restaurantContainer = document.querySelector('.restaurants');
const restaurantData = [
    { name: 'Little Caesars', category: 'Italian', image: '/placeholder.svg?height=100&width=100' },
    { name: 'Sushi Express', category: 'Japanese', image: '/placeholder.svg?height=100&width=100' },
    { name: 'Burger King', category: 'Fast food', image: '/placeholder.svg?height=100&width=100' },
    { name: 'Cafe Don Justo', category: 'Breakfast, Coffee', image: '/placeholder.svg?height=100&width=100' }
];

// Cargar restaurantes dinámicamente
function loadRestaurants() {
    restaurantContainer.innerHTML = ''; // Limpia el contenedor
    restaurantData.forEach(restaurant => {
        const restaurantElement = document.createElement('div');
        restaurantElement.className = 'restaurant';
        restaurantElement.setAttribute('data-category', restaurant.category);

        restaurantElement.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.name}">
            <div class="restaurant-info">
                <h3>${restaurant.name}</h3>
                <p>${restaurant.category}</p>
            </div>
        `;

        // Redirigir al hacer clic
        restaurantElement.addEventListener('click', () => {
            window.location.href = 'restaurant.html';
        });

        restaurantContainer.appendChild(restaurantElement);
    });
}

// Filtro de categorías
const categoryElements = document.querySelectorAll('.category');
let activeCategory = null;

categoryElements.forEach(category => {
    category.addEventListener('click', () => {
        const selectedCategory = category.querySelector('p').textContent;

        // Alternar categoría activa
        if (activeCategory === selectedCategory) {
            activeCategory = null;
            categoryElements.forEach(c => c.classList.remove('selected'));
            restaurantContainer.childNodes.forEach(restaurant => restaurant.style.display = 'flex');
            return;
        }

        // Aplicar filtro
        activeCategory = selectedCategory;
        categoryElements.forEach(c => c.classList.remove('selected'));
        category.classList.add('selected');

        restaurantContainer.childNodes.forEach(restaurant => {
            const restaurantCategories = restaurant.getAttribute('data-category').split(', ');
            if (restaurantCategories.includes(selectedCategory)) {
                restaurant.style.display = 'flex';
            } else {
                restaurant.style.display = 'none';
            }
        });
    });
});

// Barra de búsqueda
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    restaurantContainer.childNodes.forEach(restaurant => {
        const restaurantName = restaurant.querySelector('.restaurant-info h3').textContent.toLowerCase();
        if (restaurantName.includes(searchTerm)) {
            restaurant.style.display = 'flex';
        } else {
            restaurant.style.display = 'none';
        }
    });
});

// Inicializar página
document.addEventListener('DOMContentLoaded', loadRestaurants);