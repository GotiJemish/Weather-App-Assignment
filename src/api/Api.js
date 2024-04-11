
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = 'e8f9ed3cc3e9b171dd790bfa019139d9';

const fetchWeatherData = async(lat, lon)=> {
  try {
    let [weatherPromise, forcastPromise] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
      ),
    ]);
    const weatherResponse = await weatherPromise.json();
    const forcastResponse = await forcastPromise.json();
    return [weatherResponse, forcastResponse];
  } catch (error) {
    console.log(error);
  }
}


const fetchCitiesData = async () => {
  try {
    const response = await fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=population%3E100000%20AND%20alternate_names!%3D%22%22&limit=100&refine=feature_code%3A%22PPL%22');
    const data = await response.json();
  return data.results
  } catch (error) {
    console.error('Error fetching cities data:', error);
  }
};
export { fetchCitiesData, fetchWeatherData };




