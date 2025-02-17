import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Form, Link } from "react-router-dom";

export const FinishRide = (props) => {
  const navigate = useNavigate();
  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      props.setFinishRidePanel(false);

      navigate("/captain-home");
    }
  }
  return (
    <div>
      {" "}
      <h5
        className="p-3 w-[93%] text-center absolute top-0"
        onClick={() => props.setFinishRidePanel(false)}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-s-fill right-0"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish Ride!</h3>
      <div className="flex items-center justify-between p-3 border-2 bg-yellow-300 rounded-lg mt-5">
        <div className="flex items-center gap-3 ">
          <img
            className=" h-12 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6fOZZUBxA1cDlT3S9j3wso-DgS5S5nRudgeLGIjJfYSBU8TiZu7xhk0k&s"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.ride?.user.fullname.firstname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className="ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div></div>
          <div className="flex items-center gap-5 p-2 ">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-5 flex-col items-center gap-3 p-5">
          <button
            onClick={() => endRide()}
            className="w-full  bg-green-600 text-white font-semibold rounded-lg p-2 flex  justify-center mt-4"
          >
            Finish Ride
          </button>
          <p className="text-red-500 mt-10 p-4 text-xs ">
            Click on finish ride button if you have completed the payment.
          </p>
        </div>
      </div>
    </div>
  );
};
