import React, { useState } from "react";
import { Form, Link } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState(null);
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      {" "}
      <h5
        className="p-3 w-[93%] text-center absolute top-0"
        onClick={() => props.setRidePopUpPanel(false)}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-s-fill right-0"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm Ride to Start!</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-300 rounded-lg mt-5">
        <div className="flex items-center gap-3 ">
          <img
            className=" h-12 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6fOZZUBxA1cDlT3S9j3wso-DgS5S5nRudgeLGIjJfYSBU8TiZu7xhk0k&s"
            alt=""
          />
          <h2 className="text-lg font-medium">Daulat Khan</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Iskon Temple,Bangalore
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className="ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Iskon Temple,Bangalore
              </p>
            </div>
          </div>
          <div></div>
          <div className="flex items-center gap-5 p-2 ">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹193.52</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-5 flex items-center justify-between gap-3 p-5">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="w-full"
          >
            <input
              type="text"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              className="bg-[#eee] px-6 py-4 font-mono  text-lg rounded-lg w-full mt-3 mb-3"
            ></input>

            <Link
              to="/captain-riding"
              onClick={() => {}}
              className="w-full  bg-green-600 text-lg text-white font-semibold rounded-lg p-2 flex  justify-center mt-4"
            >
              Confirm
            </Link>
            <button
              onClick={() => {
                props.setConfirmRidePopUpPanel(false);
                props.setRidePopUpPanel(false);
              }}
              className="w-full text-lg bg-red-700 text-white font-semibold rounded-lg p-2 mt-3"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
