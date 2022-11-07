import React, { useEffect, useRef } from 'react';
import { Listing } from '../features/listing/components/listing';
import { Explore } from '../features/listing/components/explore';
import { Navbar } from '../hoc/navbar/navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import '../style/_app.css';

function App() {

  return (
    <Router>
      <div className="app">
        <header className="App-header">
          <Navbar />
        </header>

        <Routes>
          <Route path="/about" element={<Listing/>} />
          <Route path="/exp" element={<Explore/>} />
          <Route path="/" element={<Listing/>} />
        </Routes>
        
      </div>
    </Router>
  );
}
 
export default App;
