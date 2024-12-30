import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      console.log("Redirecting to login");
      navigate("/login");
    }
  }, [token, navigate]);

  // Dependencies to ensure the effect runs when necessary
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setUser(response.data.user);
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/login");
    });

  if (isLoading) {
    return <div>Loading....</div>;
  }
  // Render children only if token exists
  return token ? <>{children}</> : null;
};

export default UserProtectWrapper;
