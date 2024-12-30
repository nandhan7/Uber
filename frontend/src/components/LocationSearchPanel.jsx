import React from "react";

const LocationSearchPanel = (props) => {
  //sample array for location
  const locations = [
    "40B Rameshwaram Cafe , Bangalore 560027 ",
    "Pump House, J.P. Nagar, Bangalore 560078 ",
    "Iskon Temple,Rajajinagar, Bengaluru 560010",
  ];
  return (
    <div>
      {locations.map((location, index) => (
        <div
          onClick={() => {
            props.setVehiclePanelOpen(true);
            props.setPanel(false);
          }}
          key={index}
          className="flex gap-4 p-3 active:border-black border-gray-100 rounded-xl border-2  items-center my-2 justify-start"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i class="ri-map-pin-line"></i>
          </h2>
          <h4 className="font-medium text-base">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
