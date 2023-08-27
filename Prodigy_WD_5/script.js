const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherDataDiv = document.getElementById('weatherData');

searchButton.addEventListener('click', fetchWeather);

async function fetchWeather() {
    const city = cityInput.value;
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            weatherDataDiv.innerHTML = '<p>City not found.</p>';
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

function displayWeather(data) {
    const weatherHtml = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherDataDiv.innerHTML = weatherHtml;
}
