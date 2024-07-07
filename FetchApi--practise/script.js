console.log('jaba jaba');
const API_KEY = "411e5d04f655ecfd5bf1b4c0fe03e88b";

async function fetchWeatherApi()
{
    // let longitude = 15.3333;
    // let latitude = 75.8333;

    let city = "Mumbai";


    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}");

    const result = await response.json();

    console.log(result);

    console.log("weather data :-",result);
}