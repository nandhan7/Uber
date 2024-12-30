import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captain
    );
    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full mb-7 text-lg  placeholder:text-base"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="youremail@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full mb-7 text-lg  placeholder:text-base"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold rounded px-4 py-2 mb-1 border w-full">
            Login
          </button>
        </form>
        <p className="text-center mb-3">
          Join a fleet?
          <Link to="/captain-signup" className="text-blue-600 ">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold rounded px-4 py-2 border w-full"
        >
          Sign up as user
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
