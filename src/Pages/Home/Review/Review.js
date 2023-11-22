import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Card, CardContent, Rating } from '@mui/material';
import './Review.css'
import SkeletonComponent from '../../shared/Skeleton/Skeleton';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


function ReviewCarousel() {
    const [reviews, setReviews] = React.useState([])
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true)
    const maxSteps = reviews?.length;

    React.useEffect(() => {
        fetch('https://by-cycle-center-faishal-developer.vercel.app/reviews')
            .then((res) => res.json())
            .then(data => {
                setReviews(data)
                setIsLoading(false)
            })
            .catch(e => console.log(e.message))
    }, [])
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    if (isLoading && reviews.length < 1) {
        return <SkeletonComponent service={false} />
    }

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', my: 5, flexGrow: 1 }}>
            <Typography sx={{ color: "primary.main", fontWeight: 'bold', textAlign: 'center', my: 5 }} variant="h5">Client Says About Us</Typography>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {reviews.map((review, index) => (
                    <div key={review._id}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Card sx={{ textAlign: 'center', minWidth: 275 }}>
                                <img
                                    component="img"
                                    style={{
                                        maxWidth: 120,
                                        overflow: 'hidden'
                                    }}
                                    src={review.image}
                                    alt={review.name}
                                />
                                <CardContent>
                                    <blockquote>
                                        <Typography variant="body2">
                                            {review?.says}
                                        </Typography>
                                    </blockquote>
                                    <Rating
                                        name="text-feedback"
                                        value={Number(review?.Review)}
                                        readOnly
                                        precision={0.1}

                                    />
                                </CardContent>
                            </Card>

                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
}

export default ReviewCarousel;


// https://i.ibb.co/TmcLcX9/imagefor-Review2.jpg
// https://i.ibb.co/NtQzSCh/imagefor-Review3.jpg

