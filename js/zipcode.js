//Funcionalidad de codigo postal
async function loadLocation() {
    const zipCode = document.getElementById('restaurant-zipcode').value;

    if (!zipCode) {
        alert('Please enter a zip code.');
        return;
    }

    try {
        // Llamada a la API para obtener datos de ubicación
        const response = await fetch(`https://api.zippopotam.us/mx/${zipCode}`);
        if (!response.ok) {
            throw new Error('Zip code not found.');
        }

        const data = await response.json();

        // Actualizar los campos con la información de la API
        document.getElementById('restaurant-country').value = data.country;
        document.getElementById('restaurant-state').value = data.places[0]['state'];
        document.getElementById('restaurant-city').value = data.places[0]['place name'];
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

// Asignar el evento al botón "load" cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('zipcode-button').addEventListener('click', loadLocation);
});
