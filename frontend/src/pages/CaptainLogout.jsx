import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/captain-login");
      }
    });
  return <div>UserLogout</div>;
};

export default CaptainLogout;
