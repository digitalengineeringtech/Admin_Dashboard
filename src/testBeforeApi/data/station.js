import React, { useEffect, useState } from "react";
import UseCloudGet from "../../api/hooks/UseCloudGet";
import useTokenStorage from "../../utils/useDecrypt";

const station = () => {
  const [{ data_gc, loading_gc, error_gc }, getToCloud] = UseCloudGet();
  const [okData, setOkData] = useState([]);
  const { loadToken } = useTokenStorage();

  useEffect(() => {
    const token = loadToken();
    if (token) {
      getToCloud(`station-detail/get/all`, token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data_gc.result) {
      setOkData(data_gc.result);
    }
  }, [data_gc, loading_gc, error_gc]);
  return okData;
};

export default station;
