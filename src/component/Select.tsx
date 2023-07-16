interface Props {
  options: string[];
  selectName: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  value: string;

  // onClick: (value: string) => void;
}

export default function Select({
  options,
  selectName,
  onChange,
  error,
  value,
}: Props) {
  return (
    <div className="flex flex-col gap-1 ">
      <div className="flex gap-2">
        <div className="w-2 bg-yellow-400 h-5"></div>
        <label htmlFor="" className="text-gray-300">
          {selectName}
        </label>
      </div>
      <select
        name={selectName}
        id=""
        className="appearance-none rounded-sm text-sm p-2 border-gray-400 border-2 bg-transparent text-gray-400 outline-none focus:border-yellow-400 focus:bg-yellow-300 focus:bg-opacity-10 blur:border-gray-400 "
        defaultValue="انتخاب ژانر فیلم"
        onChange={onChange}
        value={value}
        // onClick={onChange}
      >
        <option selected value="ژانر" className="bg-gray-300 text-gray-800">
          ژانر را انتخاب کنید
        </option>
        {options.map((option, index) => (
          <option
            className="bg-gray-400 text-gray-700 hover:bg-gray-500 hover:text-white"
            key={index}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
      {error !== '' ? <p className="text-red-500">{error}</p> : null}
    </div>
  );
}
