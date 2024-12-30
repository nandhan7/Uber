import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        className="p-3 w-[93%] text-center absolute top-0"
        onClick={() => props.setVehiclePanelOpen(false)}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-s-fill right-0"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div>
        <div
          onClick={() => {
            props.setConfirmRidePanel(true);
          }}
          className="flex p-3 w-full active:border-black  bg-gray-50 items-center border-2  mb-2 rounded-xl justify-between "
        >
          <img
            className="h-12 p-0.5"
            src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png"
          />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">
              UberGo
              <span>
                <i className="ri-user-fill"></i>
                {""}4
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable , compact rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">₹193.20</h2>
        </div>

        <div
          onClick={() => {
            props.setConfirmRidePanel(true);
          }}
          className="flex p-3 w-full items-center border-2 active:border-black  bg-gray-50 mb-2 justify-between rounded-xl "
        >
          <img
            className="h-12 p-0.5"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">
              Moto
              <span>
                <i className="ri-user-fill"></i>
                {""}1
              </span>
            </h4>
            <h5 className="font-medium text-sm">3 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable Motorcycle ride
            </p>
          </div>
          <h2 className="text-lg font-semibold">₹53</h2>
        </div>
        <div
          onClick={() => {
            props.setConfirmRidePanel(true);
          }}
          className="flex p-3 w-full items-center border-2 active:border-black  bg-gray-50 mb-2 justify-between rounded-xl "
        >
          <img
            className="h-12  p-0.5"
            src="https://cdn3d.iconscout.com/3d/premium/thumb/auto-rickshaw-4454424-3692776.png"
          />
          <div className="ml-2  w-1/2">
            <h4 className="font-medium text-base">
              UberAuto
              <span>
                <i className="ri-user-fill"></i>
                {""}3
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable Auto rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">₹103.20</h2>
        </div>
      </div>
    </div>
  );
};

export default VehiclePanel;
