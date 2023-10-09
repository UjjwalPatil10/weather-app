import React, { useState } from 'react';
import '../components/weatherApp.css';

const WeatherApp = () => {
    const [city, setCity] = useState(null);  // Change initial state to null
    const [search, setSearch] = useState(null);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setSearch(inputValue);
        if (inputValue === '') {
            setCity(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!search) {
            setCity(null);
            return;
        }

        const Url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=b3467e5a3fc55daba406b7ad8a83dc9e`;
        const res = await fetch(Url);
        const data = await res.json();
        console.log(data);
        if (data?.main) {
            setCity(data);  // Update city with the response data
        }
    };

    const getWeatherImage = () => {

        if (city?.main?.temp <= 23) {  // Access temp property from main object
            return <img style={{ width: '110px', height: '105px' }} className="image" src="https://cdn.pixabay.com/photo/2012/04/18/13/22/cloud-37011_1280.png" alt="Cold Temperature" />;
        } else if (city?.main?.temp > 23 && city?.main?.temp <= 33) {  // Access temp property from main object
            return <img style={{ width: '110px', height: '105px' }} src="https://cdn.pixabay.com/photo/2012/04/18/13/21/clouds-37009_1280.png" alt="Rainy/Cloudy Weather" />;
        } else if (city?.main?.temp > 34) {  // Access temp property from main object
            return <img style={{ width: '110px', height: '105px' }} src="https://cdn.pixabay.com/photo/2013/07/13/12/12/sun-159392_640.png" alt="Hot Temperature" />;
        }
    };

    return (
        <>
            <header className='header'>
                <h1 className='tag'>Weather Dashboard</h1>

            </header>

            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="top-bar">
                        <input type="search" placeholder="Search City here..." onChange={handleChange} value={search} />
                        <button className="search" type="submit">
                            Search
                        </button>
                    </div>
                </form>

                {(search && !city) ? (
                    <div>
                        <h4 className='not-found' style={{ color: "white" }}>City Not Found</h4>
                    </div>
                ) : null}


                {!city ? (
                    <div>
                        {/* <h4 style={{ color: "white" }}>City Not Found</h4> */}
                    </div>
                ) : (
                    <div className="hello">
                        {getWeatherImage()}
                        <div className='manage'>
                            <h1>{city?.main?.temp}°C</h1>
                            <h1>{search}</h1>
                        </div>

                        <div className='got'>
                            {/* for humidity  */}

                            <div className='humidity'>
                                <div>
                                    <span className="material-symbols-outlined">
                                        humidity_percentage
                                    </span>
                                    <h3>{city?.main?.humidity} %</h3>
                                    <h5>humidity</h5>
                                </div>
                            </div>
                            {/* for wind speed  */}
                            <div className='wind-speed'>
                                <div>
                                    <span className="material-symbols-outlined">
                                        air
                                    </span>
                                    <h3>{city?.wind?.speed} km/hr</h3>
                                    <h5>wind speed</h5>
                                </div>
                            </div>
                            {/* for description  */}
                            <div className='description'>
                                <div>
                                    <h4>description</h4>
                                    <h5>{city?.weather[0]?.description}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default WeatherApp;
