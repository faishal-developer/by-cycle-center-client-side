import { useEffect, useState } from 'react';

const useHandleSearch = () => {
    const [searchedCycle, setSearchedCycle] = useState([])
    const [value, setValue] = useState(100);
    let [finalCycles, setFinalCycles] = useState([])

    const handleSearch = (e, cycles, searchTerm) => {
        e?.preventDefault()

        console.log(cycles, searchTerm);
        if (searchTerm === '') {
            setSearchedCycle(cycles);
            return
        }
        let filtered = cycles.filter((cycle, i) => {
            return cycle.description.toLowerCase().includes(searchTerm.toLowerCase())
        })

        setSearchedCycle(filtered)
    }

    const handleSliderChange = (event, newValue = 100) => {
        setValue(newValue);
        console.log(searchedCycle);
        let newCycles = searchedCycle.filter((cycle, i) => {
            return cycle.price <= value * 3
        })
        setFinalCycles(newCycles)
    };

    useEffect(() => {
        handleSliderChange()
    }, [searchedCycle])

    return {
        searchedCycle,
        setSearchedCycle,
        handleSearch,
        value,
        handleSliderChange,
        finalCycles
    }
};

export default useHandleSearch;