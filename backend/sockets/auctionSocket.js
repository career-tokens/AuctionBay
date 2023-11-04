module.exports = (socket, io) => {
    //  socket: represents a client-side socket connection
    //  io: represents the server-side socket connection that can broadcast events to all
  
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("disconnect", () => {
      console.log("🔥: A user disconnected");
    });
    // When a socket sends the "bid" event to the server, the "recieveBid" event will be broadcast to all connected sockets
    socket.on("bid", (data, room) => {
      io.to(room).emit("recieveBid", data);
      console.log("sending receiveBid event to room: ",room)
    });
  
    socket.on("join", (room, callback) => {
      socket.join(room);
      console.log("Room=", room);
      callback("You have joined the room" + " " + room);
    });
    socket.on("leave", (room, callback) => {
      socket.leave(room);
      callback("You have left the room" + " " + room);
    });
  };