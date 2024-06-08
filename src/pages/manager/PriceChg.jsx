import React, { useEffect, useState } from "react";
import TextInput from "../../components/inputbox/TextInput";
import Button from "../../components/inputbox/Button";
import fuelData from "../../pages/installer/drop_data/fuel";
import useTokenStorage from "../../utils/useDecrypt";
import UsePost from "../../api/hooks/UsePost";
import Alert from "../../components/alert/Alert";
import LoaderCom from "../../components/LoaderCom";
import ConAlert from "../../components/alert/ConAlert";
import Swal from "sweetalert2";

const PriceChg = () => {
  const [{ data, loading, error }, fetchIt] = UsePost();
  const [priceChg, setPriceChg] = useState();
  const [load, setLoad] = useState();
  const [token, setToken] = useState("none");
  const { loadToken } = useTokenStorage();

  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);

  console.log(data);
  // useEffect(() => {
  //   data.result && setPriceChg(null);
  // }, [data]);

  const handleInputChange = (fuelType, value) => {
    setPriceChg((prevData) => ({
      ...prevData,
      [fuelType]: value,
    }));
  };
  const handleClick = async () => {
    setLoad(true);
    await fetchIt("/daily-price", priceChg, token);
    setLoad(false);
    setPriceChg();
  };

  useEffect(() => {
    if (data.con == true) {
      Swal.fire({
        title: "New Price was added",
        icon: "success",
        buttonsStyling: false,
        iconColor: "#38b59e",
        color: "#38b59e",
        width: "25em",
        background: "#ffffff",
        customClass: {
          title: "text-white",
          confirmButton:
            "bg-detail text-secondary rounded-lg border-2 border-detail hover:text-[#38b59e] duration-150 hover:bg-secondary w-[300px] font-mono py-2",
        },
      });
    }
  }, [data]);

  console.log(priceChg);
  return (
    <>
      {load && <LoaderCom />}
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
                    // onClick={handleClick}
                    onClick={ConAlert("Are you sure ?", true, handleClick)}
                    className="ms-auto mt-auto w-[230px] h-[55px] text-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceChg;
