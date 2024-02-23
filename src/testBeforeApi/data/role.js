import React, { useEffect, useState } from "react";
import useTokenStorage from "../../utils/useDecrypt";
import UseGet from "../../api/hooks/UseGet";

const role = () => {
  const [{ data_g, loading_g, error_g }, fetchItGet] = UseGet();
  const { loadToken } = useTokenStorage();
  const [okData, setOkData] = useState([]);

  useEffect(() => {
    const token = loadToken();
    if (token) {
      fetchItGet("/role", token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data_g) {
      setOkData(data_g);
    }
  }, [data_g, loading_g, error_g]);

  return okData;
};

export default role;
