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
      setLoading(true);
      const res = await axios.post(
        api,
        { username, password },
        { withCredentials: true }
      );
      dispatch({
        type: "LOGIN",
        payload: res.data.data.user,
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
