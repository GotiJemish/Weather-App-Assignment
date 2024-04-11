import { Box,Typography } from '@mui/material';
import React from 'react';

const WeatherIconDetail = (props) => {
  return (
   
 <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
      }}
    >
       <Box
      component="img"
      sx={{
        width: { xs: '50px', sm: '60px' },
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: '0 auto',
        padding: '0',
      }}
      alt="weather"
      src={props.src}
    />
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: '10px', sm: '12px', md: '14px' },
          color: 'rgba(255,255,255)',
          lineHeight: 1,
          letterSpacing: { xs: '1px', sm: '0' },
          fontFamily: 'Roboto Condensed',
        }}
      >
        {new Date(props.data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true})
          } - {new Date(props.data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true})
        }
        
      </Typography>
    </Box> 



  );
};

export default WeatherIconDetail;


