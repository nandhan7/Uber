import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FinishRide } from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = (props) => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;
  console.log(rideData);
  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );
  return (
    <div className="h-screen ">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full">
        <img
          className="w-16"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-Logo-Transparent-Background.png"
          alt=""
        />
        <Link
          to="/home"
          className="flex h-10 w-10 bg-white items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        {/* <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        /> */}
        <LiveTracking/>
      </div>
      <div
        className="h-1/5 p-6 bg-yellow-500 flex items-center justify-between relative"
        onClick={() => setFinishRidePanel(true)}
      >
        <h5
          className="p-1 w-[95%] text-center absolute top-0 "
          onClick={() => {}}
        >
          <i className="text-3xl text-black-200 ri-arrow-down-s-fill right-0"></i>
        </h5>
        <h4 className="text-xl font-semibold">4KM Away</h4>
        <button className="  bg-green-600 text-white font-semibold rounded-lg p-3 px-10 flex  justify-center">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full h-screen z-10 translate-y-full bottom-0 px-3 py-6  bg-white pt-12"
      >
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
