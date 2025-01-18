import React from "react";
import { Link } from "react-router-dom";

const Riding = (props) => {
  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 flex h-10 w-10 bg-white items-center justify-center rounded-full"
      >
        <i className="text-lg font-medium ri-home-line"></i>
      </Link>
      <div className="h-1/2">
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>

      <div className="h-1/2 p-4">
        <div>
          <div className="flex  items-center justify-between">
            <img
              className=" h-20 w-[30%] p-2"
              src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png"
            />
            <div className="text-right">
              <h2 className="text-lg font-medium">Nandhan</h2>
              <h4 className="text-xl font-semibold -mt-1 -mb-1">
                KA01 AB 1234
              </h4>
              <h4 className="text-sm text-gray-600">Maruthi suzuki</h4>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center gap-2">
            <div className="w-full mt-5">
              <div className="flex items-center gap-5 p-2 border-b-2">
                <i className="ri-map-pin-fill"></i>
                <div>
                  <h3 className="text-lg font-medium">562/11-A</h3>
                  <p className="text-sm -mt-1 text-gray-600">
                    Iskon Temple,Bangalore
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 ">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹193.52</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-green-600 text-white font-semibold rounded-lg p-2">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
