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
      const res = await axios.post(
        api,
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "LOGIN",
        payload: res.data.data,
      });
      navigate(navigate_to);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return { login, error, loading, success };
}

export default useLogin;
