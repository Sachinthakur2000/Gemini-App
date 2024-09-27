import React, { useState, useEffect } from 'react';

const LeftBottomFields = () => {
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [address, setAddress] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lon: longitude });

                    // Reverse Geocoding to get city and country
                    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                        .then((response) => response.json())
                        .then((data) => {
                            const city = data.address.city || data.address.town || data.address.village;
                            const country = data.address.country;
                            setAddress(`${city}, ${country}`);
                        })
                        .catch((err) => {
                            setError('Unable to retrieve address information');
                        });
                },
                (err) => {
                    setError('Unable to retrieve location');
                }
            );
        } else {
            setError('Geolocation is not supported by this browser');
        }
    }, []);

    return (
        <div className="left-bottom-field">
            {error ? (
                <p>{error}</p>
            ) : address ? (
                <p>Location: {address}</p>
            ) : location.lat && location.lon ? (
                <p>
                    Latitude: {location.lat}, Longitude: {location.lon} (Fetching address...)
                </p>
            ) : (
                <p>Fetching location...</p>
            )}
        </div>
    );
};

export default LeftBottomFields;
