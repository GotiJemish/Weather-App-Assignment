import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell from '@mui/material/TableCell';
import { fetchCitiesData } from '../../api/Api';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';


const Homepage = () => {
  const [citiesData, setCitiesData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [searchValue, setSearchValue] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCitiesData();
        setCitiesData(data);
      } catch (error) {
        console.error('Error fetching cities data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { label: 'ID', dataKey: 'id', width: 10 },
    { label: 'City Name', dataKey: 'name', width: 200 },
    { label: 'Country', dataKey: 'country', width: 150 },
    { label: 'Timezone', dataKey: 'timezone', width: 150 },
    { label: 'Alternate Names', dataKey: 'alternate', width: 150 },
  ];

  const rows = citiesData.map((row, index) => ({
    id: index + 1,
    name: row.name,
    country: row.label_en,
    timezone: row.timezone,
    alternate: Array.isArray(row.alternate_names) ? row.alternate_names.slice(0, 3).join(', ') : '',
    coordinates: row.coordinates,
  }));

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const filterRows = () => {
    if (searchValue.trim() === '' && !selectedCity) {
      return rows;
    } else if (selectedCity) {
      // Filter rows 
      return rows.filter(row => row.name.toLowerCase() === selectedCity.toLowerCase());
    } else {
      return rows.filter((row) => {
        return Object.entries(row).slice(1).some(([key, value]) =>
          key !== 'id' && value.toString().toLowerCase().includes(searchValue.toLowerCase())
        );
      });
    }
  };


  const sortedRows = stableSort(filterRows(), getComparator(order, orderBy));



  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setSearchValue('');
  };


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Container
          sx={{
            maxWidth: { xs: '95%', sm: '80%', md: '1100px' }, width: '100%', margin: 'auto', padding: '1rem', borderRadius: { xs: 'none', sm: '1rem', }, boxShadow: { xs: 'none', sm: 'rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px', },
          }}
        >
          <Grid container justifyContent="center" marginTop="1rem" marginBottom="1rem">
            <Grid item xs={12} sm={6} md={4} lg={3} >

              <Stack
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 'dense',
                  backgroundColor: 'transparent',

                }}
              >
                <Autocomplete
                  sx={{
                    width: '100%',
                  }}
                  freeSolo
                  disableClearable
                  options={citiesData.map((option) => option.name)} // Map city names as suggestions
                  value={selectedCity}
                  onChange={(event, newValue) => handleSelectCity(newValue)} // Handle city selection
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search input"
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        sx: {
                          backgroundColor: 'rgba(255, 255, 255, 0.6)',
                          color: 'black',
                        }
                      }}
                    />

                  )}
                />

              </Stack>




            </Grid>
          </Grid>
          <TableContainer component={Paper} sx={{ height: 500, backgroundColor: 'transparent', overflow: 'auto', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '4px' } }}>
            <Table stickyHeader sx={{ minWidth: 700 }} size="small">
              <TableHead sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.dataKey}
                      align="center"
                      sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', color: 'black' }}
                    >
                      <TableSortLabel
                        active={orderBy === column.dataKey}
                        direction={orderBy === column.dataKey ? order : 'asc'}
                        onClick={() => handleRequestSort(column.dataKey)}
                        sx={{ color: 'black' }}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {sortedRows.map((row) => (
                  <TableRow key={row.id} hover>
                    {columns.map((column, index) => (
                      <TableCell key={column.dataKey} align="center" sx={{ color: 'white', borderBottom: '1px solid black', fontSize: 14 }}>
                        {index === 1 ? (
                          <Link to={`/weather?lat=${row.coordinates.lat}&lon=${row.coordinates.lon}`} style={{ color: 'yellow', textDecoration: 'none' }}>
                            {row[column.dataKey]}
                          </Link>
                        ) : (
                          row[column.dataKey]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>




        </Container>
      </div>
    </>
  );
};

export default Homepage;
