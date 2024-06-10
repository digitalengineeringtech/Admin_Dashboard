import React, { useEffect, useState } from "react";
import UseDelete from "../../api/hooks/UseDelete";
import UsePatch from "../../api/hooks/UsePatch";
import useTokenStorage from "../../utils/useDecrypt";
import SelectDrop from "./SelectDrop";
import role from "../../testBeforeApi/data/role";
import UseGet from "../../api/hooks/UseGet";
import Button from "../../components/installer/Button";
import { FaTrashCan } from "react-icons/fa6";
import permit from "./drop_data/permit";

const Role = () => {
  const [users, setUsers] = useState([]);
  const { loadToken } = useTokenStorage();
  const [active, setActive] = useState(0);
  const [userObj, setUserObj] = useState([]);
  const [permitId, setPermitId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [token, setToken] = useState("");

  const [{ data_g, loading_g, error_g }, fetchItGet] = UseGet();
  const [{ data_d, loading_d, error_d }] = UseDelete();
  const [{ data_pch, loading_pch, error_pch }, patchIt] = UsePatch();

  console.log(permitId);

  useEffect(() => {
    const token = loadToken();

    if (token) {
      setToken(token);
      fetchItGet("/user/admin", token);
    }
    // fetchItGet('user/admin',loadToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data_g.length !== 0) {
      setUserObj(data_g[active]);
      setUsers(data_g);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data_g, loading_g, error_g]);

  useEffect(() => {
    console.log("err", error_pch);

    if (data_pch.con) {
      fetchItGet("/user/admin", token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data_pch, loading_pch, error_pch]);

  useEffect(() => {
    console.log(data_d, loading_d, error_d);
  }, [data_d, loading_d, error_d]);

  const handleClick = (e, index) => {
    setActive(index);
    setUserObj(e);
  };

  const handleRoleAdd = (obj) => {
    if (obj) {
      let data = new FormData();

      data.append("userId", obj._id);
      data.append("roleId", roleId._id);

      patchIt("user/add/role", data, token);
    }
  };

  const handlePermitAdd = (obj) => {
    if (obj) {
      let data = new FormData();
      data.append("userId", obj._id);
      data.append("permitId", permitId._id);

      patchIt("user/add/permit", data, token);
    }
  };

  const handleRoleDelete = (obj) => {
    if (obj) {
      let data = new FormData();

      data.append("userId", userObj._id);
      data.append("roleId", obj._id);
      patchIt("user/remove/role", data, token);
    }
  };

  const handlePermitDelete = (obj) => {
    if (obj) {
      let data = new FormData();
      data.append("userId", userObj._id);
      data.append("permitId", obj._id);
      patchIt("user/remove/permit", data, token);
    }
  };

  // console.log(userObj);

  return (
    <div className="flex flex-col   items-center">
      <div className="w-[1320px]  justify-between flex rounded-2xl p-6  gap-6 gap-y-4 ">
        <div className="flex flex-col h-[90vh] py-2 px-4 overflow-y-scroll  gap-5 w-[27%]">
          {users.map((e, index) => (
            <div
              onClick={() => handleClick(e, index)}
              key={index}
              className={`${
                active == index ? "bg-detail text-white" : "bg-secondary"
              } shadow-md shadow-shadow/20 cursor-pointer active:scale-100 hover:scale-105 duration-150 text-text rounded-lg px-4 py-4`}
            >
              <div className="flex mb-2 items-center border-b border-detail pb-2  flex-col">
                <div className="text-lg font-semibold select-none">
                  Station ID
                </div>
                <div className="text-lg font-mono select-none">
                  {e.stationId}
                </div>
              </div>
              <div className="text-lg font-semibold select-none">
                Name :
                <span className="ms-2 font-normal select-none">{e.email}</span>
              </div>
              <div className="text-lg font-semibold select-none">
                Station No :
                <span className="ms-2 font-normal select-none">
                  {e.stationNo}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[70%] flex gap-3 flex-col">
          <div className="flex gap-6 mb-3">
            <div className="font-mono bg-secondary shadow-shadow/20 shadow-md px-10 rounded-xl  items-center flex gap-6 ms-3 font-semibold text-3xl py-6">
              <img
                src="../../../public/static/images/settings.png"
                alt=""
                className="h-16"
              />
              <div className="text-text">Role Setup</div>
            </div>
            <div className="bg-secondary w-[400px] shadow-md flex shadow-shadow/20 rounded-lg p-5">
              <table>
                <tr className="text-xl">
                  <td className="me-2">Cashier Code : </td>
                  <td>{userObj.name}</td>
                </tr>
                <tr className="text-xl">
                  <td className="w-[160px]">Phone Number : </td>
                  <td>{userObj.phone}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className=" flex justify-between rounded-lg  w-full">
            <div className=" w-[48%] px-8 rounded-xl py-6 bg-secondary shadow-md shadow-shadow/20 ">
              <h1 className="font-mono text-xl font-semibold">Permits</h1>
              <div className=" flex items-center gap-3 ">
                <SelectDrop
                  data={permit()}
                  value={permitId}
                  setValue={setPermitId}
                />
                <Button
                  onClick={() => handlePermitAdd(userObj)}
                  title="ADD"
                  style="bg-detail font-semibold text-secondary mt-auto h-[60px] w-[100px]"
                />
              </div>
              <div className=" gap-7 mt-5 flex ps-0 p-3 pt-4">
                {userObj?.permits?.map((e, index) => (
                  <div
                    key={index}
                    className="border-2 font-semibold text-detail border-detail  relative px-4 py-3 rounded-xl"
                  >
                    {e.name}
                    <div
                      onClick={() => handlePermitDelete(e)}
                      className="absolute text-white text-sm bg-red-400 -top-3 -right-3 w-8 cursor-pointer h-8 flex items-center justify-center rounded-full"
                    >
                      <FaTrashCan />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" w-[48%] px-8 rounded-xl py-6 bg-secondary shadow-md shadow-shadow/20 ">
              <h1 className="font-mono text-xl font-semibold">Roles</h1>
              <div className=" flex items-center gap-3 ">
                <SelectDrop data={role()} value={roleId} setValue={setRoleId} />
                <Button
                  onClick={() => handleRoleAdd(userObj)}
                  title="ADD"
                  style="bg-detail font-semibold text-secondary mt-auto h-[60px] w-[100px]"
                />
              </div>
              <div className=" gap-7 mt-5 flex ps-0 p-3 pt-4">
                {userObj?.roles?.map((e) => (
                  <div className="border-2 font-semibold text-detail border-detail  relative px-4 py-3 rounded-xl">
                    {e.name}
                    <div
                      onClick={() => handleRoleDelete(e)}
                      // onClick={() => console.log("hello")}
                      className="absolute text-white text-sm bg-red-400 -top-3 -right-3 w-8 cursor-pointer h-8 flex items-center justify-center rounded-full"
                    >
                      <FaTrashCan />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
