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
            alert('City not found. Please enter a valid city name.');
            return;
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
        <p><strong>City:</strong> ${data.name || 'N/A'}</p>
        <p><strong>Temperature:</strong> ${data.main ? data.main.temp + '°C' : 'N/A'}</p>
        <p><strong>Humidity:</strong> ${data.main ? data.main.humidity + '%' : 'N/A'}</p>
        <p><strong>Weather:</strong> ${data.weather ? data.weather[0].description : 'N/A'}</p>
    `;
    document.getElementById('current-info').innerHTML = info;
}

// Set initial empty values for weather information
document.getElementById('current-info').innerHTML = `
    <p><strong>City:</strong> N/A</p>
    <p><strong>Temperature:</strong> N/A</p>
    <p><strong>Humidity:</strong> N/A</p>
    <p><strong>Weather:</strong> N/A</p>
`;

function displayForecast(data) {
    const forecastCards = document.getElementById('forecast-cards');
    forecastCards.innerHTML = '';

    // Filter forecast data to get one forecast per day at 12:00 PM
    const dailyForecasts = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));

    dailyForecasts.forEach(forecast => {
        const dayOfWeek = new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
        const card = document.createElement('div');
        card.classList.add('forecast-card');
        card.innerHTML = `
            <h3>${dayOfWeek}</h3>
            <p><strong>Temperature:</strong> ${forecast.main.temp}°C</p>
            <p><strong>Humidity:</strong> ${forecast.main.humidity}%</p>
            <p><strong>Weather:</strong> ${forecast.weather[0].description}</p>
        `;
        forecastCards.appendChild(card);
    });
}

// Set initial empty values for forecast section
document.getElementById('forecast-cards').innerHTML = `
    <div class="forecast-card">
        <h3>Day One</h3>
        <p><strong>Temperature:</strong> N/A</p>
        <p><strong>Humidity:</strong> N/A</p>
        <p><strong>Weather:</strong> N/A</p>
    </div>
    <div class="forecast-card">
        <h3>Day Two</h3>
        <p><strong>Temperature:</strong> N/A</p>
        <p><strong>Humidity:</strong> N/A</p>
        <p><strong>Weather:</strong> N/A</p>
    </div>
    <div class="forecast-card">
        <h3>Day Three</h3>
        <p><strong>Temperature:</strong> N/A</p>
        <p><strong>Humidity:</strong> N/A</p>
        <p><strong>Weather:</strong> N/A</p>
    </div>
    <div class="forecast-card">
        <h3>Day Four</h3>
        <p><strong>Temperature:</strong> N/A</p>
        <p><strong>Humidity:</strong> N/A</p>
        <p><strong>Weather:</strong> N/A</p>
    </div>
    <div class="forecast-card">
        <h3>Day Five</h3>
        <p><strong>Temperature:</strong> N/A</p>
        <p><strong>Humidity:</strong> N/A</p>
        <p><strong>Weather:</strong> N/A</p>
    </div>
`;
