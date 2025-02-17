// socket.js
const { Server } = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io; // Store the io instance

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*", // Or specify your allowed origins
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });

        // Add other socket event listeners here (e.g., "join_room", "chat_message")
        socket.on("join", async (data) => {
           
            const { userId, userType } = data;
            if (userType === 'user') {
                const user = await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                });

            } else if (userType === 'captain') {
                
                const captain = await captainModel.findByIdAndUpdate(userId, { socketId: socket.id })

               
            }
        });

        socket.on("update-location-captain", async (data) => {
            const { userId, location } = data;
            // console.log("here updating", data)
            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', 'Invalid location provided');
            }
            // console.log("here updating", data)

            const captain = await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            })

        })
    });

    return io; // Return the io instance
}

function sendMessageToSocketId(socketId, messageObject) {
    console.log("sending message to socket id", socketId)
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject); // Emit the message to the specific socket ID
    } else {
        console.error("Socket.io not initialized. Call initializeSocket first.");
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };