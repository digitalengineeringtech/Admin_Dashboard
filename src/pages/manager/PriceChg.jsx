import React, { useEffect, useState } from "react";
import TextInput from "../../components/inputbox/TextInput";
import Button from "../../components/inputbox/Button";
import fuelData from "../../pages/installer/drop_data/fuel";
import useTokenStorage from "../../utils/useDecrypt";
import UsePost from "../../api/hooks/UsePost";

const PriceChg = () => {
  const [{ data, loading, error }, fetchIt] = UsePost();
  const [priceChg, setPriceChg] = useState();
  const [token, setToken] = useState("none");
  const { loadToken } = useTokenStorage();
  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);
  console.log(data?.result);
  useEffect(() => {
    data.result && setPriceChg(null);
  }, [data]);

  const handleInputChange = (fuelType, value) => {
    setPriceChg((prevData) => ({
      ...prevData,
      [fuelType]: value,
    }));
  };
  const handleClick = () => {
    fetchIt("/daily-price", priceChg, token);
  };

  console.log(priceChg);
  return (
    <div className="w-full pt-28">
      <div className="login_bg rounded-3xl xl:h-[79vh] 2xl:h-[83vh] flex items-center justify-center">
        <div className="bg-secondary p-3 w-[900px]  pb-14 rounded-2xl">
          <div className="">
            <p className="text-detail text-4xl text-center mt-7 font-semibold mb-9">
              Price Change Form
            </p>
            <div className="">
              <div className="flex flex-wrap justify-between gap-y-7 rounded-md w-[90%] mx-auto  ">
                {fuelData.map((fuel) => (
                  <TextInput
                    onChange={(e) =>
                      handleInputChange(fuel.code, e.target.value)
                    }
                    value={priceChg?.[fuel.code]}
                    label={fuel.name}
                    placeholder={fuel.name}
                    style="!w-[230px]"
                  />
                ))}
                <Button
                  text="Update"
                  onClick={handleClick}
                  className="ms-auto mt-auto w-[230px] h-[55px] text-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceChg;
