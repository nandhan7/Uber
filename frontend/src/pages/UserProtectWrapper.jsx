import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false); // Add error state

    useEffect(() => {
        if (!token) {
            console.log("No token, redirecting to login");
            navigate("/login");
            return; // Important: Return to prevent further execution
        }

        const fetchUserProfile = async () => {
            setIsLoading(true); // Set loading before the API call
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setUser(response.data);
                    setIsLoading(false);
                } else {
                    console.error("Unexpected status code:", response.status);
                    setHasError(true); // Set error state
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setHasError(true); // Set error state
                localStorage.removeItem("token");
                navigate("/login");
            } finally {
                setIsLoading(false); // Ensure loading is set to false even on error
            }
        };

        fetchUserProfile(); // Call the async function
    }, [token, navigate, setUser]); // Add setUser to the dependency array


    if (isLoading) {
        return <div>Loading....</div>;
    }

    if (hasError) {
        return <div>Error loading user data. Please try again.</div>; // Display error message
    }

    // Render children only if token exists AND user data is loaded
    return user && token ? <>{children}</> : null;
};

export default UserProtectWrapper;