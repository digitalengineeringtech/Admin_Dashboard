import React from "react";

const Button = ({ title, style, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${style} w-[200px] text-mono items-center justify-center gap-3 flex font-mono active:scale-95 duration-100 h-[56px] rounded-md`}
    >
      {title}
    </button>
  );
};

export default Button;
