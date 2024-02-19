import "./button.css";
const Button = ({ text, onClick, className }) => {
  return (
    <div
      className={`${className}   bg-detail hover:scale-105 duration-100 select-none cursor-pointer active:scale-100 text-white py-3 rounded-lg text-xl `}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Button;
