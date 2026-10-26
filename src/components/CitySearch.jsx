import React, { useState, useRef, useEffect } from 'react';

const CitySearch = ({ allLocations, currentCity, setCurrentCity, setInfoAlert  }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    
    const citySearchRef = useRef(null);
    
    // Keep the input in sync when App changes the selected city
    useEffect(() => {
    if (currentCity === "See all cities") {
        setQuery("");
    } else {
        setQuery(currentCity);
    }
    }, [currentCity]);


    useEffect(() => {
        setSuggestions(allLocations);
    }, [`${allLocations}`]);

    // Close suggestions when the user clicks outside CitySearch
    useEffect(() => {
    const handleClickOutside = (event) => {
        if (
        citySearchRef.current &&
        !citySearchRef.current.contains(event.target)
        ) {
        setShowSuggestions(false);
        }
    };

    document.addEventListener(
        "mousedown",
        handleClickOutside
    );

    return () => {
        document.removeEventListener(
        "mousedown",
        handleClickOutside
        );
    };
    }, []);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        }) : [];


        setQuery(value);
        setSuggestions(filteredLocations);

        let infoText;
        if (filteredLocations.length === 0){
            infoText = "We an not find the city you are looking for.Please try another city"
        } else {
            infoText = ""
        }
        setInfoAlert(infoText);
    };

    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false); // to hide the list
        setCurrentCity(value);
        setInfoAlert("")
    };

    return (
        <div 
            id="city-search"
            ref={citySearchRef}
        >
            <input
                type="text"
                className="city"
                placeholder="Search for a city"
                value={query}
                onFocus={() => setShowSuggestions(true)}
                onChange={handleInputChanged}
            />
            {showSuggestions ? 
                <ul className="suggestions">
                    {suggestions.map((suggestion) => {
                        return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
                    })}
                    <li key='See all cities' onClick={handleItemClicked}>
                        <b>See all cities</b>
                    </li>
                </ul> 
            : null
            }
        </div>
    )
};


export default CitySearch;