import React from "react";
import TextInput from "../../components/inputbox/TextInput";
import Button from "../../components/inputbox/Button";

const PriceChg = () => {
  return (
    <div className="w-full pt-28">
      <div className="login_bg rounded-3xl xl:h-[79vh] 2xl:h-[83vh] flex items-center justify-center">
        <div className="bg-secondary p-3 w-[900px] h-[440px] rounded-2xl">
          <div className="">
            <p className="text-detail text-4xl text-center mt-7 font-semibold mb-9">
              Price Change Form
            </p>
            <div className="">
              <div className="flex flex-wrap justify-between gap-y-7 rounded-md w-[90%] mx-auto  ">
                <TextInput
                  label="Octane Ron ( 95 )"
                  placeholder="Octane Ron (95)"
                  style="!w-[230px]"
                />
                <TextInput
                  label="Octane Ron ( 95 )"
                  placeholder="Octane Ron (95)"
                  style="!w-[230px]"
                />
                <TextInput
                  label="Octane Ron ( 95 )"
                  placeholder="Octane Ron (95)"
                  style="!w-[230px]"
                />
                <TextInput
                  label="Octane Ron ( 95 )"
                  placeholder="Octane Ron (95)"
                  style="!w-[230px]"
                />
                <TextInput
                  label="Octane Ron ( 95 )"
                  placeholder="Octane Ron (95)"
                  style="!w-[230px]"
                />
                <TextInput
                  label="Octane Ron ( 95 )"
                  placeholder="Octane Ron (95)"
                  style="!w-[230px]"
                />
                <Button
                  text="Update"
                  className="ms-auto w-[230px] mt-1 text-center"
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
