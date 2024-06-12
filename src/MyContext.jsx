import React, { createContext, useState, useEffect } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [state, setState] = useState({
    batteryJump: {
      totalNumberOfOrders: 0
    }
  });

  useEffect(() => {
    const storedData = localStorage.getItem('batteryJump');
    if (storedData) {
      setState(prevState => ({
        ...prevState,
        batteryJump: JSON.parse(storedData)
      }));
    }
    localStorage.removeItem("batteryJump")
  }, []);

  const updateBatteryJump = (totalNumberOfOrders) => {
    const newState = {
      ...state,
      batteryJump: { totalNumberOfOrders }
    };
    setState(newState);
    localStorage.setItem('batteryJump', JSON.stringify(newState.batteryJump));
  };

  return (
    <MyContext.Provider value={{ state, updateBatteryJump }}>
      {children}
    </MyContext.Provider>
  );
};
