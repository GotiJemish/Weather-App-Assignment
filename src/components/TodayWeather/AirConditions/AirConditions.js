import React from 'react';
import ErrorBox from '../../Reusable/ErrorBox';
import AirConditionsItem from './AirConditionsItem';
import Layout from '../../Reusable/Layout';
import NorthEastIcon from '@mui/icons-material/NorthEast';

const TodayWeatherAirConditions = ({ data }) => {

// console.log(data)
const temperature = Math.round(data.main.feels_like - 273).toFixed(2);
const temperatureDisplay = temperature >= 0 ? temperature : `-${Math.abs(temperature)}`;

const temperature_min = Math.round(data.main.temp_min - 273).toFixed(2);
const temperatureDisplay_min = temperature_min >= 0 ? temperature_min : `-${Math.abs(temperature_min)}`;

const temperature_max = Math.round(data.main.temp_max - 273).toFixed(2);
const temperatureDisplay_max = temperature_max >= 0 ? temperature_max : `-${Math.abs(temperature_max)}`;


  const noDataProvided =
    !data || Object.keys(data).length === 0 || data.cod === '404';

  let content = <ErrorBox flex="1" type="error" />;
  
  const getWindDirection=(degrees)=> {
    const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }
  const windDirection = getWindDirection(data.wind.deg);
 



  
  if (!noDataProvided)
    content = (
      <>
        <AirConditionsItem
          title="Real Feel"
          value={`${temperatureDisplay} °C`}
          type="temperature"
        />
         <AirConditionsItem
          title="Temperature"
          value={`${temperatureDisplay_min} - ${temperatureDisplay_max} °C`}
          type="temperature"
        />
        
        <AirConditionsItem
  title={<>
    Wind <NorthEastIcon fontSize='small' /> {windDirection}
  </>}
  value={`${Math.round(data.wind.speed * 3.6).toFixed(2)} Km/h`}
  type="wind"
/>

       
        <AirConditionsItem
          title="Clouds"
          value={`${Math.round(data.clouds.all).toFixed(2)} %`}
          type="clouds"
        />
        <AirConditionsItem
          title="Humidity"
          value={`${Math.round(data.main.humidity).toFixed(2)} %`}
          type="humidity"
        />
        
           <AirConditionsItem
            title="Visibility"
            value={`${Math.round(data.visibility/1000).toFixed(2)} Km`}
          />
         
      </>
    );
  return (
    <Layout
      title="AIR CONDITIONS"
      content={content}
      mb="1rem"
      sx={{ marginTop: '2.9rem' }}
    />
  );
};

export default TodayWeatherAirConditions;
