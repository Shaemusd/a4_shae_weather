const apiKey = 'e9dfc06caa9207559ad2408abdc07b83';

document.getElementById('search-btn').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    try {
        // Step 1: Get city coordinates (latitude and longitude)
        const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
        const geoResponse = await fetch(geocodingUrl);
        if (!geoResponse.ok) {
            throw new Error('Failed to fetch city coordinates.');
        }
        const geoData = await geoResponse.json();
        if (geoData.length === 0) {
            throw new Error('City not found.');
        }

        const { lat, lon } = geoData[0];

        // Step 2: Fetch current weather data using latitude and longitude
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
            throw new Error('Failed to fetch weather data.');
        }
        const weatherData = await weatherResponse.json();

        // Step 3: Fetch 5-day forecast data
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
            throw new Error('Failed to fetch forecast data.');
        }
        const forecastData = await forecastResponse.json();

        // Step 4: Display weather data
        displayWeather(weatherData);
        displayForecast(forecastData);
    } catch (error) {
        console.error(error);
        alert('Error: ' + error.message);
    }
});

function displayWeather(data) {
    const info = `
    City: ${data.name}
    Temperature: ${data.main.temp}°C
    Humidity: ${data.main.humidity}%
    Weather: ${data.weather[0].description}`;
    document.getElementById('current-info').textContent = info;
}

function displayForecast(data) {
    const forecastCards = document.getElementById('forecast-cards');
    forecastCards.innerHTML = '';

    // Filter forecast data to get one forecast per day at 12:00 PM
    const dailyForecasts = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));

    dailyForecasts.forEach(forecast => {
        const card = document.createElement('div');
        card.classList.add('forecast-card');
        card.innerHTML = `
            <h3>${new Date(forecast.dt_txt).toLocaleDateString()}</h3>
            <p>Temp: ${forecast.main.temp}°C</p>
            <p>Humidity: ${forecast.main.humidity}%</p>
            <p>${forecast.weather[0].description}</p>
        `;
        forecastCards.appendChild(card);
    });
}