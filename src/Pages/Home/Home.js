import React from 'react';
import Banner from './Banner/Banner';
import Service from './Services/Service';
import Header from '../shared/Header/Header'
import Footer from '../shared/Footer/Footer'
import Review from './Review/Review'

const Home = () => {
    return (
        <div>
            <Header />
            <Banner />
            <Service home={true} />
            <Review />
            <Footer />
        </div>
    );
};

export default Home;