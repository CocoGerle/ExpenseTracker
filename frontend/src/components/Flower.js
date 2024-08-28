import React, { useEffect, useState } from "react";

const Flower = () => {
  const [falling, setFalling] = useState(false);
  const [style, setStyle] = useState({});

  useEffect(() => {
    const xPosition = Math.random() * window.innerWidth;
    const fallDuration = 5 + Math.random() * 5; // Falling duration between 5 and 10 seconds
    const delay = Math.random() * 5; // Delay before fall between 0 and 5 seconds

    setStyle({
      left: `${xPosition}px`,
      animation: `fall ${fallDuration}s linear ${delay}s forwards`,
    });

    setFalling(true);
  }, []);

  return falling ? <div className="flower" style={style} /> : null;
};

export default Flower;
