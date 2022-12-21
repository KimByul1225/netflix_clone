import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';

import Home from './Routes/Home';

import Header from './Components/common/Header';
import Footer from './Components/common/Footer';
import Series from './Routes/Series';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}>
          < Route path="movies/:id" element={< Home />} />
        </Route>
        <Route path="/series" element={<Series />}>
          <Route path=":tv_id" element={<Series />} />
        </Route>

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
