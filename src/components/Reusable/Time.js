import React from 'react';
import { Typography } from '@mui/material';

const Time = ({ timezone }) => {
  const now = new Date(); 
  const offsetMilliseconds = timezone * 1000; 
  const utcTime = new Date(now.getTime() + offsetMilliseconds).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h12',
    timeZone: 'UTC',
  });

  return (
    <Typography
      variant="h3"
      component="h3"
      sx={{
        fontSize: '20px',
        color: 'rgba(255, 255, 255, .7)',
        fontFamily: 'Poppins',
      }}
    >
      {utcTime}
    </Typography>
  );
};

export default Time;
