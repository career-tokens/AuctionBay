import Nav from "./components/Nav";
import { Route, Routes, BrowserRouter as Router, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { authContext } from "./context/authContext/authContextProvider";
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register/Register";
import { socket } from "./socket/socket";
import BidProduct from "./components/Bid/BidProduct";

function App() {
  const { user, isAuthReady } = useContext(authContext);

  return (
    <div>
      {isAuthReady && (
        <>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/bid/:id"
              element={
                <ProtectedRoute user={user}>
                  <BidProduct socket={socket} />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
