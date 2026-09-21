type InputProps = {
  type?: string;
  placeholder?: string;
};

function Input({ type = "text", placeholder }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
    />
  );
}

export default Input;