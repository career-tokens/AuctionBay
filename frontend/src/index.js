import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./context/authContext/authContextProvider";
import { BrowserRouter, Router } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AuctionContextProvider from "./context/auctionContext/auctionContextProvider";
import AnimatedCursor from "react-animated-cursor"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AuctionContextProvider>
        <BrowserRouter>
          <Layout>
            <App />
            {/* <AnimatedCursor
      innerSize={10}
      outerSize={30}
              innerStyle={{
        backgroundColor:"white"
              }}
              outerStyle={{
                backgroundImage: ` radial-gradient(circle, #eb1212, #f85e00, #ff8e00, #ffba00, #ffe424)`
              }}
      outerScale={2}
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link',
        {
          target: '.custom',
          options: {
            outerScale: 1.2,
          }
        }
              ]}
              
    /> */}
          </Layout>
        </BrowserRouter>
      </AuctionContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
