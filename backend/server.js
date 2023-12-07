const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const redis = require("redis");
const socketHandler = require("./sockets/index");
let RedisStore = require("connect-redis").default;

require("dotenv").config();



// Create Redis client and store
let redisClient = redis.createClient({ url: process.env.REDIS_URL});
let redisStore = new RedisStore({ client: redisClient });

// Initialize Express app
const app = express();
const port = process.env.PORT || 4000;

// Create MongoDB connection URL
const mongoUrl = process.env.MONGODB_URI;

// Import router modules for routing
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");



// parsing json for the request body
app.use(express.json());

// Enable CORS for incoming requests from a specific origin
app.use(cors({
  credentials: true,
  origin: process.env.ORIGIN || "https://realtime-auction.vercel.app",
  allowedHeaders: ["Content-Type", "Authorization", "Origin", "Accept", "X-Requested-With"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
}));

// to allow data transfer between client and server
const http = require("http").Server(app);

const socketIO = require("socket.io")(http, {
  // setted the cors origin to allow connections to react client
  cors: {
    origin:'*',
  },
});
// Pass to socket to handler to handle socket events from sockets/index.js
socketHandler(socketIO);

// Connect to Redis server
redisClient.connect().catch((err) => {
  console.log(err);
});

// Use RedisStore for session management
app.use(
  session({
    name: "Hello",
    store: redisStore,
    secret: "secret",
    cookie: {
      maxAge: 60000 * 60 * 24,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
    saveUninitialized: false,
    resave: false,
  })
);

const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl)
    .then(() => console.log("successfully connected to the database"))
    .catch((err) => {
      console.log(err);
      // retry to connect after 5 seconds if connection fails
      setTimeout(connectWithRetry, 5000);
    });
};
//connect to the MongoDB database
connectWithRetry();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/products", productRouter);

// Listen for incoming HTTP requests on the specified port
http.listen(port, () => {
  console.log(`Server started on port ${port}`);
});