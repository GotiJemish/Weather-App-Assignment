import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Link, Typography, SvgIcon } from '@mui/material';
import { transformDateFormat } from '../../utilities/DatetimeUtils';
import Time from '../Reusable/Time';
import LoadingBox from '../Reusable/LoadingBox';
import { ReactComponent as SplashIcon } from './../../assets/splash-icon.svg';
import ErrorBox from '../Reusable/ErrorBox';
import { ALL_DESCRIPTIONS } from '../../utilities/DateConstants';
import HomeIcon from '@mui/icons-material/Home';
import { getTodayForecastWeather, getWeekForecastWeather } from '../../utilities/DataUtils';
import { useLocation } from 'react-router-dom';
import TodayWeather from '../TodayWeather/TodayWeather';
import WeeklyForecast from '../WeeklyForecast/WeeklyForecast';
import { fetchWeatherData } from '../../api/Api';






const Weather = () => {
  const location = useLocation();
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [Timezone, setTimezone] = useState();
  const [city, setcity] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const queryParams = new URLSearchParams(location.search);
      const latitude = queryParams.get('lat');
      const longitude = queryParams.get('lon');

      try {
        const [todayWeatherResponse, weekForecastResponse] = await fetchWeatherData(latitude, longitude);

        setcity(`${todayWeatherResponse.name} , ${todayWeatherResponse.sys.country}`)
        setTimezone(todayWeatherResponse.timezone)
        const all_today_forecasts_list = getTodayForecastWeather(
          weekForecastResponse,
          transformDateFormat(),
          Math.floor(Date.now() / 1000)
        );

        const all_week_forecasts_list = getWeekForecastWeather(
          weekForecastResponse,
          ALL_DESCRIPTIONS
        );

        setTodayForecast([...all_today_forecasts_list]);
        setTodayWeather({ city, ...todayWeatherResponse });
        setWeekForecast({
          city,
          list: all_week_forecasts_list,
        });

      } catch (error) {
        setError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [location.search]);


  let appContent = (
    <Box
      xs={12}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        minHeight: '500px',
      }}
    >
      <SvgIcon
        component={SplashIcon}
        inheritViewBox
        sx={{ fontSize: { xs: '100px', sm: '120px', md: '140px' } }}
      />
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: '12px', sm: '14px' },
          color: 'rgba(255,255,255, .85)',
          fontFamily: 'Poppins',
          textAlign: 'center',
          margin: '2rem 0',
          maxWidth: '80%',
          lineHeight: '22px',
        }}
      >
        Explore current weather data and 6-day forecast of more than 200,000
        cities!
      </Typography>
    </Box>
  );

  if (todayWeather && todayForecast && weekForecast) {
    appContent = (
      <React.Fragment>
        <Grid item xs={12} md={todayWeather ? 6 : 12}>
          <Grid item xs={12}>
            <TodayWeather data={todayWeather} forecastList={todayForecast} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <WeeklyForecast data={weekForecast} />
        </Grid>
      </React.Fragment>
    );
  }

  if (error) {
    appContent = (
      <ErrorBox
        margin="3rem auto"
        flex="inherit"
        errorMessage="Something went wrong"
      />
    );
  }

  if (isLoading) {
    appContent = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '500px',
        }}
      >
        <LoadingBox value="1">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: '10px', sm: '12px' },
              color: 'rgba(255, 255, 255, .8)',
              lineHeight: 1,
              fontFamily: 'Poppins',
            }}
          >
            Loading...
          </Typography>
        </LoadingBox>
      </Box>
    );
  }

  return (
    <>



      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Container
          sx={{
            maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
            width: '100%',
            margin: 'auto',
            padding: '1rem',
            borderRadius: {
              xs: 'none',
              sm: '1rem',
            },
            boxShadow: {
              xs: 'none',
              sm: 'rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px',
            },
          }}
        >
          <Grid container columnSpacing={2}>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  width: '100%',
                }}
              >
                <Time timezone={Timezone} sx={{
                  height: { xs: '10px', sm: '15px', md: '20px' },
                  width: 'auto',
                }} />

                <Typography variant="h5" sx={{ color: '#2d95bd', marginRight: '10px', width: 'auto' }}>{city}</Typography>
                <Link
                  href="/"
                  target="_blank"
                  underline="none"
                  sx={{ display: 'flex' }}
                >
                  <HomeIcon
                    sx={{
                      fontSize: { xs: '20px', sm: '22px', md: '26px' },
                      width: 'auto',
                      color: 'white',
                      '&:hover': { color: '#2d95bd' },
                    }}
                  />
                </Link>
              </Box>
            </Grid>
            {appContent}
          </Grid>
        </Container>
      </div>

    </>);
}

export default Weather;
