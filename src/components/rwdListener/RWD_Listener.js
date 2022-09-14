import React, { useState, useEffect } from 'react';

export default function RWD_Listener() {
  const [device, setDevice] = useState('mobile');

  let screenDeceitHandler = () => {
    if (window.innerWidth < 600) {
      setDevice((device) => {
        return (device = 'small');
      });
    } else {
      setDevice((device) => {
        return (device = 'large');
      });
    }
  };

  useEffect(() => {
    window.addEventListener('resize', screenDeceitHandler);
    screenDeceitHandler();
    return () => {
      window.removeEventListener('resize', screenDeceitHandler);
    };
  }, []);
  return device;
}
