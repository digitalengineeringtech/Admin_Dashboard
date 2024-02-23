/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import UseGet from "../../../api/hooks/UseGet";
import useTokenStorage from "../../../utils/useDecrypt";

const permit = () => {
  const [{ data_g, loading_g, error_g }, fetchItGet] = UseGet();
  const { loadToken } = useTokenStorage();
  const [okData, setOkData] = useState([]);

  useEffect(() => {
    const token = loadToken();
    if (token) {
      fetchItGet("/permit", token);
    }
  }, []);

  useEffect(() => {
    setOkData(data_g);
    // console.log(data_g);
  }, [data_g, loading_g, error_g]);

  return okData;
};

export default permit;
