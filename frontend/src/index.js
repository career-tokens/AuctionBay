import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./context/authContext/authContextProvider";
import { BrowserRouter, Router } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AuctionContextProvider from "./context/auctionContext/auctionContextProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AuctionContextProvider>
        <BrowserRouter>
          <Layout>
            <App />
            <ToastContainer />
          </Layout>
        </BrowserRouter>
      </AuctionContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
