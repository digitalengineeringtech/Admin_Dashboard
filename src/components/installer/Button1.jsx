import React from "react";

const Button = ({ height, width, padding, color, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${height} flex items-center active:bg-green-700 justify-center hover:border hover:border-white duration-100 bg-green-600 cursor-pointer rounded-md me-5 mt-5 text-white text-[1.2rem]  ${width} ${padding} ${color}`}
    >
      {title}
    </button>
  );
};

export default Button;
