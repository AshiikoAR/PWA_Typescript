import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import config from './config.json';

const App: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    console.log('App component mounted');
  }, []);

  const takePhoto = async () => {
    console.log('Photo en cours...');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      await new Promise((resolve) => (video.onloadedmetadata = resolve));
      video.play();

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setPhoto(dataUrl);
        localStorage.setItem('photo', dataUrl);
        console.log('Photo prise:', dataUrl);
        new Notification('Photo prise', { body: 'Votre photo a été prise avec succès!' });
      } else {
        console.error('Contexte du canvas non disponible');
      }
    } catch (error) {
      console.error('Erreur lors de la prise de photo:', error);
    }
  };

  const getLocation = () => {
    console.log('Récupération de la localisation...');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log('Position :', position);
        setLocation(position);
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${config.mapboxApiKey}`);
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          setAddress(data.features[0].place_name);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la localisation:', error);
      }
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home takePhoto={takePhoto} getLocation={getLocation} photo={photo} location={location} address={address} />} />
      </Routes>
    </Router>
  );
};

export default App;
