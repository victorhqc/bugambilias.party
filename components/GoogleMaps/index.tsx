import React, { useEffect, useState, useRef } from 'react';
import styles from './styles.module.css';

const API_URL = 'https://www.google.com/maps/embed/v1/place';
const PLACE_ID = 'ChIJARpAGqxc04URY5TLo4MgIZA';
const API_KEY = 'AIzaSyDQidbKnDjna487kBx4mdqh4EHHlebbjHU';

const MAPS_SRC = `
${API_URL}?
q=place_id:${PLACE_ID}
&zoom=14
&key=${API_KEY}
`;

// src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJARpAGqxc04URY5TLo4MgIZA&key=AIzaSyDQidbKnDjna487kBx4mdqh4EHHlebbjHU"
const GoogleMaps = () => {
  const [width, setWidth] = useState(600);
  const wrapperRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();

    setWidth(rect.width);
  }, [wrapperRef.current]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <iframe width={width} height="450" frameBorder="0" src={MAPS_SRC} allowFullScreen />
    </div>
  );
};

export default GoogleMaps;
