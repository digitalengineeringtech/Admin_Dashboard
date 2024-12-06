import React, { useEffect, useState } from "react";
import SearchButton from "../../components/SearchButton";
import { FaPlusCircle } from "react-icons/fa";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ImCross } from "react-icons/im";
import TextInput from "../../components/inputbox/TextInput";
import SelectDrop from "../../components/SelectDrop";
import ConAlert from "../../components/alert/ConAlert";
import { localInstance } from "../../api/axios";
import useTokenStorage from "../../utils/useDecrypt";
import UseGet from "../../api/hooks/UseGet";
import Swal from "sweetalert2";

const Discount = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isModalOpen, { open: showModal, close: closeModal }] =
    useDisclosure(false);
  const [token, setToken] = useState();
  const { loadToken } = useTokenStorage();
  const [Amount, setAmount] = useState();
  const [dType, setDType] = useState();
  const [con, setCon] = useState(true);
  const [id, setId] = useState();

  const [{ data_g, loading_g, error_g, pagi_g }, fetchItGet] = UseGet();

  useEffect(() => {
    const token = loadToken();
    if (token) {
      setToken(token);
    }
  }, []);

  const type = [
    { label: "Percent", value: "percent" },
    { label: "Percent", value: "percent" },
  ];

  const url = "/discount";
  const user = {
    type: dType?.value,
    amount: Amount,
    isActive: false,
  };

  const handleCancel = () => {
    close();
    closeModal();
    setAmount("");
    setDType("");
  };

  console.log(Amount, dType);

  useEffect(() => {
    fetchItGet(url, token);
  }, [con]);

  const cardEdit = (id, amount) => {
    console.log(id, amount);
    const patchData = {
      isActive: false,
      amount: amount,
    };
    localInstance
      .put(`discount/${id}`, patchData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        res.status == 200 && closeModal();
        setCon((prev) => !prev);
        handleCancel();
        // dispatch({ type: "fetch-data", payload: res.data });
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          title: "Something went wrong",
          icon: "success",
          buttonsStyling: false,
          iconColor: "#33b0f9",
          color: "#33b0f9",
          width: "25em",
          background: "#ffffff",
          customClass: {
            title: "text-white",
            confirmButton:
              "bg-detail text-secondary rounded-lg border-2 border-detail hover:text-[#33b0f9] duration-150 hover:bg-secondary w-[300px] font-mono py-2",
          },
        });
        // dispatch({ type: "error", payload: e });
      });
  };

  const cardDel = (id) => {
    localInstance
      .delete(`discount/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        res.status == 200 && setCon((prev) => !prev);
        // dispatch({ type: "fetch-data", payload: res.data });
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          title: "Something went wrong",
          icon: "success",
          buttonsStyling: false,
          iconColor: "#33b0f9",
          color: "#33b0f9",
          width: "25em",
          background: "#ffffff",
          customClass: {
            title: "text-white",
            confirmButton:
              "bg-detail text-secondary rounded-lg border-2 border-detail hover:text-[#33b0f9] duration-150 hover:bg-secondary w-[300px] font-mono py-2",
          },
        });
        // dispatch({ type: "error", payload: e });
      });
  };

  const cardUse = (id, amount) => {
    console.log(id, amount);
    const patchData = {
      isActive: true,
      amount: amount,
    };

    console.log(user, "this is user");

    localInstance
      .put(`discount/${id}`, patchData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        res.status == 200 && setCon((prev) => !prev);
        // dispatch({ type: "fetch-data", payload: res.data });
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          title: "Something went wrong",
          icon: "success",
          buttonsStyling: false,
          iconColor: "#33b0f9",
          color: "#33b0f9",
          width: "25em",
          background: "#ffffff",
          customClass: {
            title: "text-white",
            confirmButton:
              "bg-detail text-secondary rounded-lg border-2 border-detail hover:text-[#33b0f9] duration-150 hover:bg-secondary w-[300px] font-mono py-2",
          },
        });
        // dispatch({ type: "error", payload: e });
      });
  };

  const handleCreate = (url, user, token) => {
    localInstance
      .post(url, user, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        res.status == 200 &&
          Swal.fire({
            title: "Account was created successfully!",
            icon: "success",
            buttonsStyling: false,
            iconColor: "#33b0f9",
            color: "#33b0f9",
            width: "25em",
            background: "#ffffff",
            customClass: {
              title: "text-white",
              confirmButton:
                "bg-detail text-secondary rounded-lg border-2 border-detail hover:text-[#33b0f9] duration-150 hover:bg-secondary w-[300px] font-mono py-2",
            },
          });
        close();
        setCon((prev) => !prev);
        handleCancel();
        // dispatch({ type: "fetch-data", payload: res.data });
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          title: "Something went wrong",
          icon: "success",
          buttonsStyling: false,
          iconColor: "#33b0f9",
          color: "#33b0f9",
          width: "25em",
          background: "#ffffff",
          customClass: {
            title: "text-white",
            confirmButton:
              "bg-detail text-secondary rounded-lg border-2 border-detail hover:text-[#33b0f9] duration-150 hover:bg-secondary w-[300px] font-mono py-2",
          },
        });
        // dispatch({ type: "error", payload: e });
      });
  };

  return (
    <>
      <div className="mt-4">
        <SearchButton
          style={"!w-[200px] ms-4"}
          // icon={<IconsManifest />}
          icon={<FaPlusCircle className="ms-[-18px] text-secondary" />}
          title="Create"
          onClick={() => open()}
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {data_g?.map((data) => (
          <div className="mt-8 ps-8">
            <div class="relative w-60 bg-gray-50 rounded-2xl p-4  shadow-lg shadow-sky-200 flex flex-col border border-detail justify-around items-stretch">
              <div className="flex items-start justify-between">
                <svg
                  y="0"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0"
                  width="100"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                  height="100"
                  class="stroke-blue-400 w-12 h-12 p-1 bg-sky-100 rounded-2xl"
                >
                  <path
                    stroke-width="8"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    fill="none"
                    d="M60.7,25v7.2m0,14.2v7.2m0,14.2V75M25,25a7.1,7.1,0,0,0-7.1,7.2V42.9a7.1,7.1,0,1,1,0,14.2V67.8A7.1,7.1,0,0,0,25,75H75a7.1,7.1,0,0,0,7.1-7.2V57.1a7.1,7.1,0,1,1,0-14.2V32.2A7.1,7.1,0,0,0,75,25Z"
                  ></path>
                </svg>
                <div
                  onClick={() => cardDel(data?._id)}
                  class="  text-red-300 hover:text-red-500"
                >
                  <svg
                    y="0"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0"
                    width="100"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid meet"
                    height="100"
                    class="w-12 h-12 fill-current"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M50,87.4A37.4,37.4,0,1,0,12.6,50,37.3,37.3,0,0,0,50,87.4ZM44,37.3A4.7,4.7,0,0,0,37.3,44l6.1,6-6.1,6A4.7,4.7,0,0,0,44,62.7l6-6.1,6,6.1A4.7,4.7,0,0,0,62.7,56l-6.1-6,6.1-6A4.7,4.7,0,0,0,56,37.3l-6,6.1Z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span class="text-blue-400 my-3 mb-4 text-center text-[40px] font-semibold">
                {`${data?.amount}${data?.type == "percent" && "%"} OFF`}
              </span>
              {/* <p class="text-base text-gray-600">
          Wait! you have NOT finished your purchase, do you want to continue?{" "}
        </p> */}
              <div class="flex flex-col gap-2">
                {data?.isActive == false ? (
                  <>
                    <button
                      onClick={() => cardUse(data?._id, data?.amount)}
                      class="border-2 border-blue-400 bg-blue-400 py-1 rounded text-gray-50 hover:bg-blue-300"
                    >
                      Use
                    </button>{" "}
                    <button
                      onClick={() => {
                        showModal(), setId(data?._id);
                      }}
                      class="border-2 text-gray-500 border-blue-400 py-1 rounded hover:bg-gray-100"
                    >
                      Edit Amount
                    </button>
                  </>
                ) : (
                  <>
                    <button class="border-2 border-gray-300 bg-gray-300 py-1 rounded text-gray-50 ">
                      Used
                    </button>

                    <button
                      onClick={() => cardEdit(data?._id, data?.amount)}
                      class="border-2 text-gray-500 border-blue-400 py-1 rounded hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        opened={opened}
        radius={20}
        size={1100}
        centered
        withCloseButton={false}
      >
        <div className="flex border-b mb-2 px-4 border-gray-300 pb-3 items-end">
          <div className="text-2xl select-none text-text font-semibold font-sans">
            Discount Cupon Creation
          </div>
          <div
            onClick={() => handleCancel()}
            className="w-12 h-12 rounded-full ms-auto bg-danger text-secondary hover:border-2 border-2 border-danger hover:border-danger duration-100 hover:bg-transparent hover:text-danger flex items-center justify-center"
          >
            <ImCross />
          </div>
        </div>
        <div className="bg-white flex justify-between  gap-x-2 flex-wrap gap-y-6 rounded-6 p-8 pb-16 pt-3">
          <TextInput
            style="!w-[300px]"
            label="Amount"
            placeholder="Amount"
            value={Amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <SelectDrop
            placeholder="Please Select"
            label="Customer Type"
            data={type}
            value={dType}
            setValue={setDType}
          />
          <SearchButton
            title="Create"
            onClick={ConAlert("Are you sure ?", true, () =>
              handleCreate(url, user, token)
            )}
          />
        </div>
      </Modal>
      <Modal
        opened={isModalOpen}
        radius={20}
        size={400}
        centered
        withCloseButton={false}
      >
        <div className="flex border-b mb-2 px-4 border-gray-300 pb-3 items-end">
          <div className="text-2xl select-none text-text font-semibold font-sans">
            Edit Amount
          </div>
          <div
            onClick={() => handleCancel()}
            className="w-12 h-12 rounded-full ms-auto bg-danger text-secondary hover:border-2 border-2 border-danger hover:border-danger duration-100 hover:bg-transparent hover:text-danger flex items-center justify-center"
          >
            <ImCross />
          </div>
        </div>
        <div className="bg-white flex justify-between  gap-x-2 flex-wrap gap-y-6 rounded-6 p-8 pb-6 pt-3">
          <TextInput
            style="!w-[300px]"
            label="Amount"
            placeholder="Amount"
            value={Amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          {/* <SelectDrop
            placeholder="Please Select"
            label="Customer Type"
            data={type}
            value={dType}
            setValue={setDType}
          /> */}
          <SearchButton
            title="Create"
            onClick={ConAlert("Are you sure ?", true, () =>
              cardEdit(id, Amount)
            )}
          />
        </div>
      </Modal>
    </>
  );
};

export default Discount;
