type Props = {
  label: string;
  placeHolder: string;
  onChange: (value: string) => void;
  value: string;
  error: string;
};
function TextArea({ label, placeHolder, onChange, value, error }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <div className="w-2 bg-yellow-400 h-5"></div>
        <label htmlFor="" className="text-gray-300">
          {label}
        </label>
      </div>
      <textarea
        name={label}
        id=""
        placeholder={placeHolder}
        className="w-full bg-transparent border text-white text-sm p-2 h-full"
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      ></textarea>
      {error !== '' ? <p className="text-red-500">{error}</p> : null}
    </div>
  );
}

export default TextArea;
