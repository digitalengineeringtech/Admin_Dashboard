import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import mm from "../../../public/static/images/myanmar.png";
import us from "../../../public/static/images/united-states.png";

export const Choose = ({ selectedItem, onSelectedItem }) => {
  const data = [
    {
      name: "Kyats",
    },
    {
      name: "Liters",
    },
  ];
  const [visible, setVisible] = useState(false);
  // const [value, setValue] = useState("Kyat");
  // console.log(visible)
  return (
    <div className="ms-2  flex z-50">
      <button onClick={() => setVisible((pre) => !pre)}>
        <div className="flex gap-3 border-inputB p-4 py-4 border shadow-sm shadow-shadow/20 active:scale-95 bg-input text-text rounded-lg">
          {selectedItem}
        </div>
      </button>
      {visible && (
        <div className="absolute top-24 w-[150px] z-50 flex flex-col border bg-secondary  border-detail overflow-hidden rounded-md">
          {data.map((value) => (
            <button
              className="bg-darkBg hover:bg-detail  duration-100"
              onClick={() => {
                onSelectedItem(value.name);
                // i18n.changeLanguage(value.language);
                setVisible(false);
              }}
            >
              <div className="flex gap-3 hover:text-secondary text-text p-4 py-3">
                {value.name}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
