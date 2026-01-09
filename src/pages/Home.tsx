import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Northstar from '../components/Northstar';
import ProjectGrid from '../components/ProjectGrid';
import InterestForm from '../components/InterestForm';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <About />
            <Northstar />
            <ProjectGrid />
            <InterestForm />
        </>
    );
};

export default Home;
