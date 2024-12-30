import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      console.log("Redirecting to login");
      navigate("/captain-login");
    }
  }, [token, navigate]);

  // Dependencies to ensure the effect runs when necessary
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setCaptain(response.data.captain);
        setIsLoading(false);
      }

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/captain-login");
      }
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/captain-login");
    });

  if (isLoading) {
    return <div>Loading....</div>;
  }

  // Render children only if token exists
  return token ? <>{children}</> : null;
};

export default CaptainProtectWrapper;
