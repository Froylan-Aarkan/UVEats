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