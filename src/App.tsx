import React from 'react';
import HookSentence from "./components/HookSentence";
import SolarSystem from "./components/SolarSystem";
import ProjectCards from "./components/ProjectCards";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

function App() {
  return (
    <main>
        <HookSentence />
        <SolarSystem />
        <ProjectCards />
        <ContactForm />
    </main>
  );
}

export default App;
