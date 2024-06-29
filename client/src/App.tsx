import React from 'react';
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import RevealSection from './components/RevealSection';


const App: React.FC = () => {
  return (
    <div className="">
      <Navbar />
      <RevealSection>
        <Home />
      </RevealSection>
      <RevealSection>
        <AboutUs />
      </RevealSection>
      <RevealSection>
        <Services />
      </RevealSection>
    </div>
  );
}

export default App;