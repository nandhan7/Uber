import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState();
  const [vehicleType, setVehicleType] = useState("car");
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        vehicleType: vehicleType,
      },
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      newCaptain
    );
    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setColor("");
    setCapacity(0);
    setPlate("");
    setVehicleType("moto");
  };
  return (
    <div className="px-5 py-5 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <h3 className="text-base font-medium mb-2">
            What's our Captain's name
          </h3>
          <div className="flex gap-4 mb-3">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base  placeholder:text-sm"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="First Name"
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2  ttext-base  placeholder:text-sm"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Last Name"
            />
          </div>
          <h3 className="text-base font-medium mb-2">
            What's our Captain's email
          </h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full mb-3 text-base  placeholder:text-sm"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="youremail@example.com"
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full mb-5 text-base  placeholder:text-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <h3 className="text-base font-medium mb-2">
            What's our Captain's Vehicle Details
          </h3>
          <div>
            <div className="flex gap-3">
              <input
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 mb-5 text-base placeholder:text-sm"
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
                placeholder="Color"
              />
              <input
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 mb-5 text-base placeholder:text-sm"
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                required
                placeholder="Plate"
              />
            </div>
            <div className="flex gap-3">
              <input
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full mb-5 text-base placeholder:text-sm"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                required
                placeholder="Capacity"
              />
              <select
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full mb-5 text-base placeholder:text-sm"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                required
              >
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
          <button className="bg-[#111] text-white font-semibold rounded px-4 py-2 mb-1 border w-full">
            Signup
          </button>
        </form>

        <p className="text-center mb-10">
          Already have an account?
          <Link to="/captain-login" className="text-blue-600 ">
            Login
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px]">
          This site is protected by reCAPTCHA and the Google{" "}
          <span className="underline text-blue-600">Privacy Policy</span> and
          <span className="underline text-blue-600"> Terms of Service</span>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
