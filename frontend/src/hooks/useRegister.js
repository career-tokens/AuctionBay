import axios from "axios";
import React, { useContext, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext/authContextProvider";

function useRegister(api) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const register = async (username, password, navigate_to) => {
    try {
      console.log("username=",username);
      console.log("password=",password);
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
      console.log("registering and reponse=",response);
      dispatch({
        type: "LOGIN",
        payload: response.data.user.username,
      });

      setLoading(false);
      navigate(navigate_to);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  return { register, loading, error };
}

export default useRegister;
