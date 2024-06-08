const TextInput = ({
  onChange,
  value,
  label,
  type,
  placeholder,
  err,
  style,
}) => {
  return (
    <div className={`flex flex-col w-[320px] ${style}`}>
      {label && <div className="ms-2 text-gray-500 mb-1">{label}</div>}
      <input
        className={`bg-input text-lg  border border-inputB text-text outline-detail/40 w-[100%] h-[60px] rounded-md  px-4 `}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
