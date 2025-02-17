import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanel,
  setPanel,
  setPickup,
  setDestination,
  activeField,
}) => {
  //sample array for location
  const handleSuggestionClick = (suggestion, e) => {
    e.stopPropagation();
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
    suggestions = [];
  };

  return (
    <div>
      {suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={(e) => handleSuggestionClick(elem, e)}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{elem}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
