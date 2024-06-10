import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import mm from "../../../public/static/images/myanmar.png";
import us from "../../../public/static/images/united-states.png";

export const LanguagePicker = () => {
  const { t, i18n } = useTranslation();
  // console.log("====================================");
  // console.log(t("NAV.LANGUAGE"));
  // console.log("====================================");
  //   i18n.language == "en"
  //     ? console.log(i18n.store.data.en.translation.HOME.CARD)
  //     : console.log(i18n.store.data.mm.translation.HOME.CARD);

  const data = [
    {
      name: "English",
      language: "en",
      img: us,
    },
    {
      name: "Myanmar",
      language: "mm",
      img: mm,
    },
  ];
  const [visible, setVisible] = useState(false);
  // console.log(visible)
  return (
    <div className="ms-5 flex z-50">
      <button onClick={() => setVisible((pre) => !pre)}>
        <div className="flex gap-3 p-4 py-3 border shadow-sm shadow-shadow/20 active:scale-95 bg-secondary text-text rounded-lg">
          <img
            src={i18n.language == "en" ? us : mm}
            className="h-6"
            alt="err"
          />
          {t("NAV.LANGUAGE")}
        </div>
      </button>
      {visible && (
        <div className="absolute top-24 w-[150px] z-50 flex flex-col border bg-secondary  border-detail overflow-hidden rounded-md">
          {data.map((value) => (
            <button
              className="bg-darkBg hover:bg-detail  duration-100"
              onClick={() => {
                i18n.changeLanguage(value.language);
                setVisible(false);
              }}
            >
              <div className="flex gap-3 hover:text-secondary text-text p-4 py-3">
                <img src={value.img} className="h-6" alt="err" />
                {value.name}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
