import { useState } from 'react';

const useHandleSearch = () => {
    const [searchedCycle, setSearchedCycle] = useState( [] )

    const handleSearch = ( e, cycles, searchTerm ) => {
        e?.preventDefault()

        console.log( cycles, searchTerm );
        if ( searchTerm === '' ) {
            setSearchedCycle( cycles );
            return
        }
        let filtered = cycles.filter( ( cycle, i ) => {
            return cycle.description.toLowerCase().includes( searchTerm.toLowerCase() )
        } )

        setSearchedCycle( filtered )
    }


    return {
        searchedCycle,
        setSearchedCycle,
        handleSearch
    }
};

export default useHandleSearch;