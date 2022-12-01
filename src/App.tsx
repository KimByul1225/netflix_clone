import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';

import Home from './Routes/Home';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}>
            < Route path="movies/:id" element={< Home />} />
          </Route>
        
          

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
