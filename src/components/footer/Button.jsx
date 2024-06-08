import React from "react";

const Button = ({ text, onClick, icon, className }) => {
  return (
    <div
      className={`${className} flex items-center gap-3 px-4 border-2 border-detail hover:scale-105 duration-100 select-none cursor-pointer active:scale-100 text-detail font-semibold py-3 rounded-lg text-xl `}
      onClick={onClick}
    >
      {icon} {text}
    </div>
  );
};

export default Button;
