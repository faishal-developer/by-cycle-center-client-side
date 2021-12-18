import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

export default function ContinuousSlider(props) {
    console.log(props.value);
    return (
        <Box sx={{ width: '50%', mx: 'auto' }}>
            <h2 style={{ textAlign: 'center', color: '#AA1C00', marginBottom: '5px' }}> Select Price</h2>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <span style={{ color: '#AA1C00', fontWeight: 'bold' }}>0$</span>
                <Slider aria-label="Volume" value={props.value} onChange={props.handleChange} />
                <span style={{ color: '#AA1C00', fontWeight: 'bold' }}>{props.value * 3}$</span>
            </Stack>
        </Box>
    );
}
