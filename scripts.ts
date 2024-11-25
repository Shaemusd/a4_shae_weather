const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

document.getElementById('search-btn').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const [currentWeatherRes, forecastRes] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);

        if (!currentWeatherRes.ok || !forecastRes.ok) {
            throw new Error('Failed to fetch weather data.');
        }

        const currentWeather = await currentWeatherRes.json();
        const forecast = await forecastRes.json();

        displayCurrentWeather(currentWeather);
        displayForecast(forecast);
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data.');
    }
});

function displayCurrentWeather(data) {
    const info = `
    Temperature: ${data.main.temp}°C
    Humidity: ${data.main.humidity}%
    Wind Speed: ${data.wind.speed} m/s
    Weather: ${data.weather[0].description}
  `;
    document.getElementById('current-info').textContent = info;
}

function displayForecast(data) {
    const forecastCards = document.getElementById('forecast-cards');
    forecastCards.innerHTML = '';

    const forecastList = data.list.filter((_, index) => index % 8 === 0);
    forecastList.forEach(item => {
        const card = document.createElement('div');
        card.innerHTML = `
      <p>${new Date(item.dt_txt).toDateString()}</p>
      <p>Temp: ${item.main.temp}°C</p>
      <p>${item.weather[0].description}</p>
    `;
        forecastCards.appendChild(card);
    });
}
