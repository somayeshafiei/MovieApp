type Props = {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  lable: string;
};
const Input = ({
  type,
  name,
  placeholder,
  value,
  error,
  onChange,
  lable,
}: Props) => {
  return (
    <div className="flex flex-col gap-1 ">
      <div className="flex gap-2">
        <div className="w-2 bg-yellow-400 h-5"></div>
        <label htmlFor="" className="text-gray-300 ">
          {lable}
        </label>
      </div>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 text-gray-400 bg-transparent text-sm border w-full outline-none focus:border-yellow-400 focus:bg-yellow-300 focus:bg-opacity-10"
      />
      {error !== '' ? <p className="text-red-500">{error}</p> : null}
    </div>
  );
};

export default Input;
