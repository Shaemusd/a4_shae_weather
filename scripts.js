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
        updateWeatherDetails(weatherData);
        displayForecast(forecastData);
    } catch (error) {
        console.error(error);
        alert('Error: ' + error.message);
    }
});

/// Dark Mode Function
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}


///MORE weather stats

function updateWeatherDetails(data) {
    const iconCode = data.weather ? data.weather[0].icon : '';
    const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : '';
    const sunrise = data.sys ? new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US') : 'N/A';
    const sunset = data.sys ? new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US') : 'N/A';

    document.querySelector('.weather-details .city').textContent = data.name || 'N/A';
    document.querySelector('.weather-details .temperature').textContent = data.main ? data.main.temp + '°C' : 'N/A';
    document.querySelector('.weather-details .feels-like').textContent = data.main ? data.main.feels_like + '°C' : 'N/A';
    document.querySelector('.weather-details .humidity').textContent = data.main ? data.main.humidity + '%' : 'N/A';
    document.querySelector('.weather-details .weather').textContent = data.weather ? data.weather[0].description : 'N/A';
    document.querySelector('.weather-details .sunrise').textContent = sunrise;
    document.querySelector('.weather-details .sunset').textContent = sunset;

    const weatherIcon = document.querySelector('.weather-icon');
    if (iconUrl) {
        weatherIcon.src = iconUrl;
        weatherIcon.style.display = 'block';
    } else {
        weatherIcon.style.display = 'none';
    }
}

function displayForecast(data) {
    const forecastCardsContainer = document.getElementById('forecast-cards');
    const templateCard = document.querySelector('.forecast-card');
    forecastCardsContainer.innerHTML = ''; // Clear existing cards

    // Filter forecast data to get one forecast per day at 12:00 PM
    const dailyForecasts = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));

    dailyForecasts.forEach(forecast => {
        const dayOfWeek = new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
        const iconCode = forecast.weather ? forecast.weather[0].icon : '';
        const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : '';

        // Clone the template card and fill in the details
        const card = templateCard.cloneNode(true);
        card.querySelector('.day').textContent = dayOfWeek;
        card.querySelector('.temperature').textContent = `${forecast.main.temp}°C`;
        card.querySelector('.humidity').textContent = `${forecast.main.humidity}%`;
        card.querySelector('.weather').textContent = forecast.weather[0].description;

        const forecastIcon = card.querySelector('.forecast-icon');
        if (iconUrl) {
            forecastIcon.src = iconUrl;
            forecastIcon.style.display = 'block';
        } else {
            forecastIcon.style.display = 'none';
        }

        // Append the card to the container
        forecastCardsContainer.appendChild(card);
    });
}