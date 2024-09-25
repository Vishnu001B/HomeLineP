import React, { useState, useEffect } from 'react';

const DealsHeader = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getTimeLeft() {
    const now = new Date();
    const endTime = new Date(now);
    endTime.setHours(20, 0, 0, 0); // Set to 20:00:00

    const totalSeconds = Math.max((endTime - now) / 1000, 0);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return { hours, minutes, seconds };
  }

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-6 px-4 md:px-8 shadow-lg my-4 w-full">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-center mb-4 animate-slideLeftRight">
        Deals of the Week || Deals of the Day
      </h1>
      <div className="flex justify-center items-center space-x-3 md:space-x-6 lg:space-x-8">
        {['hours', 'minutes', 'seconds'].map((unit, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-white text-blue-600 rounded-full p-4 shadow-lg">
              {String(timeLeft[unit]).padStart(2, '0')}
            </div>
            <span className="text-sm md:text-base lg:text-lg mt-2">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsHeader;
