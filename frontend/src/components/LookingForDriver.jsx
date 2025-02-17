import React from "react";

const LookingForDriver = (props) => {
  return (
    <div>
      {" "}
      <h5
        className="p-3 w-[93%] text-center absolute top-0"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-s-fill right-0"></i>
      </h5>
      <h3 className="text-2xl font-semibold">Looking for a driver</h3>
      <div className="flex flex-col justify-between items-center gap-2">
        <img
          className=" h-25"
          src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png"
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className="ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className="flex items-center gap-5 p-2 ">
        <i className="ri-currency-line"></i>
        <div>
          <h3 className="text-lg font-medium">₹{props.fare}</h3>
          <p className="text-sm -mt-1 text-gray-600">Cash</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default LookingForDriver;
