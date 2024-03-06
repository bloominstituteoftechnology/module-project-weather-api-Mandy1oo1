async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
   document.querySelector('#weatherWidget').style.display = 'none';

  // Task 2: Add an event listener to the dropdown
  document.querySelector('#citySelect').addEventListener('change', async evt => {
    console.log('selection changed');

    try {
      document.querySelector('#citySelect').setAttribute('disabled', 'disabled');
      document.querySelector('#weatherWidget').style.display = 'none';
      document.querySelector('.info').textContent = 'Fetching weather data...';

      console.log(evt.target.value);
      let city = evt.target.value;
      let url = `http://localhost:3003/api/weather?city=${city}`;

      // Task 4: Launch a request to the weather API
      const res = await axios.get(url);

      // Task 5: Handle data fetching success
      document.querySelector('.info').textContent = '';
      document.querySelector('#citySelect').removeAttribute('disabled');
      document.querySelector('#weatherWidget').style.display = 'block';

      let { data } = res;

      document.querySelector('#apparentTemp div:nth-child(2)').textContent = `${data.current.apparent_temperature}°`;
      document.querySelector('#todayDescription').textContent = descriptions.find(d => d[0] === data.current.weather_description)[1];
      document.querySelector('#todayStats div:nth-child(1)').textContent = `${data.current.temperature_min}°/${data.current.temperature_max}°`;
      document.querySelector('#todayStats div:nth-child(2)').textContent = `Precipitation: ${data.current.precipitation_probability * 100}%`;
      document.querySelector('#todayStats div:nth-child(3)').textContent = `Humidity: ${data.current.humidity}%`;
      document.querySelector('#todayStats div:nth-child(4)').textContent = `Wind: ${data.current.wind_speed}m/s`;

      data.forecast.daily.forEach((day, idx) => {
        let card = document.querySelectorAll('.next-day')[idx];

        let weekDay = card.children[0];
        let apparent = card.children[1];
        let minMax = card.children[2];
        let precipit = card.children[3];

        weekDay.textContent = getWeekDay(day.date);
        apparent.textContent = descriptions.find(d => d[0] === day.weather_description)[1];
        minMax.textContent = `${day.temperature_min}°/${day.temperature_max}°`;
        precipit.textContent = `Precipitation: ${day.precipitation_probability * 100}%`;
      });

      document.querySelector('#location').firstElementChild.textContent = data.location.city;
    } catch (err) {
      console.log('😞 Promise rejected with an err.message -->', err.message);
    }
  });

  // Function to get weekday from date
  function getWeekDay(date) {
    const options = { weekday: 'long' };
    return new Date(date).toLocaleDateString('en-US', options);
  }



  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
