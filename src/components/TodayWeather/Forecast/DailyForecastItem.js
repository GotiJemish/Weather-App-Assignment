import { Box, Typography } from '@mui/material';
import React from 'react';
import { weatherIcon } from '../../../utilities/IconsUtils';

const DailyForecastItem = (props) => {

const militaryTime = props.item.time;
const [hours, minutes] = militaryTime.split(':');
let hours12 = parseInt(hours, 10) % 12;
const amOrPm = parseInt(hours, 10) >= 12 ? 'PM' : 'AM';


hours12 = hours12 || 12;

const formattedTime = `${hours12}:${minutes} ${amOrPm}`;


  // console.log(props)
  const temperature_min = Math.round(props.data.main.temp_min - 273);
  const temperatureDisplay_min = temperature_min >= 0 ? temperature_min : `-${Math.abs(temperature_min)}`;
  const temperature_max = Math.round(props.data.main.temp_max - 273);
  const temperatureDisplay_max = temperature_max >= 0 ? temperature_max : `-${Math.abs(temperature_max)}`;
  
  return (
    <Box
      sx={{
        background:
          'linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%',
        borderRadius: '8px',
        boxShadow:
          'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        textAlign: 'center',
        padding: '4px 0',
        width: '100%',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontWeight: '400',
          fontSize: { xs: '10px', sm: '12px' },
          color: 'rgba(255, 255, 255, .7)',
          lineHeight: 1,
          padding: '4px',
          fontFamily: 'Poppins',
        }}
      >
        {formattedTime}

      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          padding: '4px',
        }}
      >
        <Box
          component="img"
          sx={{
            width: { xs: '36px', sm: '42px' },
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            margin: '0 auto',
          }}
          alt="weather"
          src={weatherIcon(`${props.data.weather[0].icon}.png`)}
        />
      </Box>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontWeight: '600',
          fontSize: { xs: '12px', sm: '14px' },
          color: 'white',
          textTransform: 'uppercase',
          lineHeight: 1,
          marginBottom: { xs: '8px', md: '0' },
          fontFamily: 'Poppins',
        }}
      >
        {temperatureDisplay_min} - {temperatureDisplay_max} °C
        
      </Typography>
    </Box>
  );
};

export default DailyForecastItem;
