import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { useSocket } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

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
  const confirmRidePanelRef = useRef(null);
  const WaitingForDriverRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const [rideDistance, setRideDistance] = useState(null);
  const navigate = useNavigate();
  const { socket, isConnected, sendMessage, receiveMessage } = useSocket();

  const { user } = useContext(UserDataContext);

  useEffect(() => {
    if (isConnected) {
      // Example: Send a message to the server when connected
      sendMessage("join", {
        userType: "user",
        userId: user._id,
      });

      // Example: Listen for a "chat_message" event from the server
      receiveMessage("chat_message", (message) => {
        // console.log("Received message:", message);
        // Handle the received message
      });
    }
  }, [isConnected, sendMessage, receiveMessage]);

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

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride.data);
    // console.log(ride);
  });
  socket.on("ride-started", (ride) => {
    // console.log(ride);
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } });
  });

  socket.on("ride-ended", () => {
    // console.log("ending");
    navigate("/home");
  });

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPickupSuggestions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      { pickup, destination, vehicleType },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log(response.data);
  }

  async function findTrip() {
    setVehiclePanelOpen(true);
    setPanel(false);
    // console.log(pickup);
    // console.log(destination);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // console.log(response.data);
    // console.log(response.data.data.fare);
    // console.log(response.data.data.distance);

    setFare(response.data.data.fare);
    setRideDistance(response.data.data.distance);
    setVehiclePanelOpen(true);
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://www.pngplay.com/wp-content/uploads/8/Uber-Logo-Transparent-Background.png"
      />

      <div className="h-screen w-screen">
        <LiveTracking />
        {/* <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        /> */}
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
              onChange={handlePickupChange}
              onClick={() => {
                setPanel(true);
                setActiveField("pickup");
              }}
            />
            <input
              className="bg-[#eee] px-8 py-2  text-base rounded-lg w-full mt-3 mb-3"
              type="text"
              placeholder="Add a Drop Location"
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => {
                setPanel(true);
                setActiveField("destination");
              }}
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanel={setPanel}
            setVehiclePanel={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-10 translate-y-full bg-white pt-14"
      >
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-20 bottom-0 px-3 py-6 translate-y-full bg-white pt-13"
      >
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          fare={fare[vehicleType]}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          vehicleType={vehicleType}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 translate-y-full bg-white pt-12"
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare[vehicleType]}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={WaitingForDriverRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6  bg-white pt-12"
      >
        <WaitingForDriver
          ride={ride}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
