import React from 'react';
import { Grid } from '@mui/material';
import { getWeekDays } from '../../utilities/DatetimeUtils';
import { weatherIcon } from '../../utilities/IconsUtils';
import WeeklyForecastItem from './WeeklyForecastItem';
import ErrorBox from '../Reusable/ErrorBox';
import UnfedForecastItem from './UnfedForecastItem';
import DayWeatherDetails from './DayWeatherDetails';
import Layout from '../Reusable/Layout';

const WeeklyForecast = ({ data }) => {
  const forecastDays = getWeekDays();

  const noDataProvided =
    !data ||
    Object.keys(data).length === 0 ||
    !data.list ||
    data.list.length === 0;

  let content = (
    <div style={{ width: '100%' }}>
      <ErrorBox type="error" />
    </div>
  );

  if (!noDataProvided)
    content = (
      <Grid
        item
        container
        display="flex"
        flexDirection="column"
        xs={12}
        gap="4px"
      >
        {data.list.slice(1).map((item, idx) => {
          const adjustedIdx = idx + 1;
          const temperature = Math.round(item.temp - 273).toFixed(2);
          const temperatureDisplay = temperature >= 0 ? temperature : `-${Math.abs(temperature)}`;

          return (
            <Grid
              item
              key={adjustedIdx}
              xs={12}
              display="flex"
              alignItems="center"
              sx={{
                margin: '0.5rem',
                padding: '2px',
                background: 'linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                borderRadius: '8px',
              }}
            >
              <DayWeatherDetails
                day={forecastDays[adjustedIdx - 1]}
                src={weatherIcon(`${item.icon}`)}
                description={item.description}
              />

              <Grid
                container
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <WeeklyForecastItem
                  type="temperature"
                  value={temperatureDisplay + ' °C'}
                  color="black"
                />
                <WeeklyForecastItem
                  type="clouds"
                  value={item.clouds + ' %'}
                  color="black"
                />
              </Grid>

              <Grid
                container
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <WeeklyForecastItem
                  type="wind"
                  value={Math.round(item.wind * 3.6).toFixed(2) + ' Km/h'}
                  color="green"
                />
                <WeeklyForecastItem
                  type="humidity"
                  value={item.humidity + ' %'}
                  color="green"
                />
              </Grid>
            </Grid>
          );
        })}
        {data.list.length === 5 && (
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            sx={{
              padding: '2px 0 2px',
              background: 'linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%',
              boxShadow: 'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
              borderRadius: '8px',
              
            }}
          >
            <UnfedForecastItem
              day={forecastDays[4]}
              value="NaN"
              src={weatherIcon('unknown.png')}
            />
          </Grid>
        )}
      </Grid>
    );

  return (
    <Layout
      title="5 DAYS FORECAST"
      content={content}
      mb=".8rem"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem 0 0',
      }}
    />
  );
};

export default WeeklyForecast;
