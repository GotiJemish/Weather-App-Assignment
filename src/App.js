
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Pages/Homepage';
import Weather from './components/Pages/Weather';

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/weather' element={<Weather />} />
        

      </Routes>

    </>
  );
}



export default App;
