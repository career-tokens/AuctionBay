import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext/authContextProvider";

function useLogin(api) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const login = async (username, password, navigate_to) => {
    try {
      setLoading(true);
      const res = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: 'include',
      });
      
      const response = await res.json();
      console.log("Login response: ",response)
      

      dispatch({
        type: "LOGIN",
        payload: response.data,
      });
      
      navigate(navigate_to);
      localStorage.setItem("present", response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return { login, error, loading, success };
}

export default useLogin;
