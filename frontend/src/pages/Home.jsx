import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panel, setPanel] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const confirmRidePanelRef = useRef(false);
  const WaitingForDriverRef = useRef(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panel) {
        gsap.to(panelRef.current, {
          height: "70%",
          opacity: 1,
          padding: 24,
        });

        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          opacity: 0,
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panel]
  );
  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://www.pngplay.com/wp-content/uploads/8/Uber-Logo-Transparent-Background.png"
      />

      <div className="h-screen w-screen">
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>
      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[35%] p-5 bg-white relative ">
          <h5
            ref={panelCloseRef}
            className="absolute right-6 top-6 text-2xl opacity-0"
            onClick={() => setPanel(false)}
          >
            <i className="ri-arrow-down-double-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold mt-3 ">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[43%] left-10 bg-gray-700 rounded-full"></div>
            <input
              className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-4"
              type="text"
              placeholder="Add a pickup Location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => setPanel(true)}
            />
            <input
              className="bg-[#eee] px-8 py-2  text-base rounded-lg w-full mt-3 mb-3"
              type="text"
              placeholder="Add a Drop Location"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setPanel(true)}
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            setVehiclePanelOpen={setVehiclePanelOpen}
            panel={panel}
            setPanel={setPanel}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-10 translate-y-full bg-white pt-14"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 translate-y-full bg-white pt-12"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
        <div
          ref={vehicleFoundRef}
          className="fixed w-full z-10 bottom-0 px-3 py-6 translate-y-full bg-white pt-12"
        >
          <LookingForDriver setVehicleFound={setVehicleFound} />
        </div>
        <div ref={WaitingForDriverRef} className="fixed w-full z-10 bottom-0 px-3 py-6  bg-white pt-12">
          <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
        </div>
      </div>
    </div>
  );
};

export default Home;
