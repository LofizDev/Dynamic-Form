import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Home from './components/Layout';
import Rebalance from './pages/Rebalance';
import PrivateRoute from './components/PrivateRoute';
import HiitRepublic from './pages/HiitRepublic';
import Clublime from './pages/Clublime';
import HiitShowdown from './pages/HiitShowdown';
import Groundup from './pages/Groundup';
import PlusFitness from './pages/PlusFitness';


const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Rebalance />} />
            <Route path="/groundup" element={<Groundup />} />
            <Route path="/clublime" element={<Clublime />} />
            <Route path="/plus-fitness" element={<PlusFitness />} />
            <Route path="/hiit-republic" element={<HiitRepublic />} />
            <Route path="/hiit-showdown" element={<HiitShowdown />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;