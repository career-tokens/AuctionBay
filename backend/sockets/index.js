const auctionSocket = require("./auctionSocket");

module.exports = (io) => {
  io.on("connection", (socket) => {
    auctionSocket(socket, io);
  });
};