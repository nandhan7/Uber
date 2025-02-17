import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();
const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(import.meta.env.VITE_BASE_URL); // Replace with your server URL
    setSocket(socketRef.current);

    socketRef.current.on("connect", () => {
      console.log("Connected to Socket.IO server");
      setIsConnected(true);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
      setIsConnected(false);
    });

    socketRef.current.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (event, data) => {
    console.log("Sending message", event, data);
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    } else {
      console.log("Socket not initialized");
    }
  };

  const receiveMessage = (event, callback) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    } else {
      console.log("Socket not initialized");
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, sendMessage, receiveMessage }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket context
const useSocket = () => {
  return useContext(SocketContext);
};

export { SocketProvider, useSocket };
