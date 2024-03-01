import { Choose } from "./Choose";

const TextInput = ({
  onChange,
  value,
  selectedItem,
  onSelectedItem,
  label,
  type,
  drop,
  placeholder,
  err,
  style,
}) => {
  return (
    <div className={`flex flex-col w-[100%] ${style}`}>
      {label && <div className="ms-2 text-gray-500 mb-1">{label}</div>}
      <div className="flex">
        <input
          className={`bg-input text-xl  border border-inputB text-text outline-detail/40 w-[100%] h-[60px] rounded-md  px-4 `}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {drop && (
          <Choose selectedItem={selectedItem} onSelectedItem={onSelectedItem} />
        )}
      </div>
    </div>
  );
};

export default TextInput;
