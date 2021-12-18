import React from 'react';
import Banner from './Banner/Banner';
import Service from './Services/Service';
import Header from '../shared/Header/Header'
import Footer from '../shared/Footer/Footer'
import Review from './Review/Review'
import CustomizedDialogs from '../Dialog/Dialog';

const Home = () => {
    const [open, setOpen] = React.useState([true, 'Please login/register to sea dashboard. To sea admin Panel please login with (email: admin@admin.com password:123456)']);

    const handleClose = () => {
        setOpen(false, '');
    };
    return (
        <div>
            <Header />
            <Banner />
            <Service home={true} />
            <Review />
            <Footer />
            {open && <CustomizedDialogs handleClose={handleClose} open={open[0]} heading="Please Attention" description={open[1]} />}
        </div>
    );
};

export default Home;