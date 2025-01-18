import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div>
      {" "}
      <h5
        className="p-3 w-[93%] text-center absolute top-0"
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-s-fill right-0"></i>
      </h5>
      <div className="flex  items-center justify-between">
        <img
          className=" h-12"
          src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png"
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">Nandhan</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">KA01 AB 1234</h4>
          <h4 className="text-sm text-gray-600">Maruthi suzuki</h4>
        </div>
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
  );
};

export default WaitingForDriver;
