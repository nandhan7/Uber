import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-bottom bg-[url(https://img.freepik.com/free-vector/taxi-app-concept_23-2148496627.jpg?t=st=1734411016~exp=1734414616~hmac=3ea7c7349a5df01a4a6535ce45b3ab1baa069cf590159530451525f8db8464c5&w=826)] h-screen pt-8 flex justify-between flex-col w-full">
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />
        <div className="bg-white py-4 px-4 pb-7">
          <h2 className="text-2xl font-bold">Get Started with Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3  mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
