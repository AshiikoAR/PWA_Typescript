import React, { useEffect } from 'react';

interface HomeProps {
  takePhoto: () => void;
  getLocation: () => void;
  photo: string | null;
  location: GeolocationPosition | null;
  address: string | null;
}

const Home: React.FC<HomeProps> = ({ takePhoto, getLocation, photo, location, address }) => {
  useEffect(() => {
    console.log('Home component mounted');
  }, []);

  return (
    <div className="container">
      <h1>Bienvenue sur ma PWA</h1>
      <button onClick={() => { console.log('Prendre une photo cliqué'); takePhoto(); }}>Prendre une photo</button>
      <button onClick={() => { console.log('Obtenir la position cliqué'); getLocation(); }}>Obtenir la position</button>
      {photo && <div>
        <h2>Photo prise :</h2>
        <img src={photo} alt="Photo prise" />
      </div>}
      {location && <div className="location-info">
        <h2>Localisation :</h2>
        <p>Latitude : {location.coords.latitude}</p>
        <p>Longitude : {location.coords.longitude}</p>
        {address && <p>Adresse : {address}</p>}
      </div>}
    </div>
  );
};

export default Home;
