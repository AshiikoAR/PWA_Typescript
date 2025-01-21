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
      <button onClick={() => { console.log('Prendre une photo cliqué'); takePhoto(); console.log('takePhoto function called'); }}>Prendre une photo</button>
      <button onClick={() => { console.log('Obtenir la position cliqué'); getLocation(); console.log('getLocation function called'); }}>Obtenir la position</button>
      {photo && <div className="photo-info">
        <h2>Photo prise</h2>
        <img src={photo} alt="Photo prise" />
      </div>}
      {location && <div className="location-info">
        <h2>Localisation</h2>
        <p>Lat/Long &bull; {location.coords.latitude} / {location.coords.longitude}</p>
        {address && <p>Adresse &bull; {address}</p>}
      </div>}
    </div>
  );
};

export default Home;
