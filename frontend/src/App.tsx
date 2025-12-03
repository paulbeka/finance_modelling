import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactGA from 'react-ga4';

import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import BasePage from './pages/BasePage';
import NotFoundPage from './pages/NotFoundPage';
import { GA_TOKEN } from './Config';

function App() {

  useEffect(() => {
    ReactGA.initialize(GA_TOKEN);
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasePage />}>
          <Route index element={<Home />} />
          
          <Route path="about" element={<About />} />
          <Route path="project/:projectId" element={<Project />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
