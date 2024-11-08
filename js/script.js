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

//Menu
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    menu.classList.remove('active');
    overlay.classList.remove('active');
});

//cart
const cartLink = document.querySelector('.cart-link');
cartLink.addEventListener('click', (event) => {
    event.preventDefault();
    // Código para abrir el carrito o modal con los productos. //pendiente
    alert("Carrito de compras");
});

//Map
let map, marker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 }, // Ubicación inicial
        zoom: 8,
    });
    marker = new google.maps.Marker({
        position: { lat: -34.397, lng: 150.644 },
        map: map,
        draggable: true,
        title: "Arrastra para seleccionar la ubicación",
    });

    google.maps.event.addListener(marker, 'dragend', function() {
        const position = marker.getPosition();
        console.log("Ubicación seleccionada:", position.lat(), position.lng());
    });
}

document.getElementById("locationLink").addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("mapModal").style.display = "flex";
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