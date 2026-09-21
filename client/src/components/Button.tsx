type ButtonProps = {
  children: React.ReactNode;
};

function Button({ children }: ButtonProps) {
  return (
    <button className="rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-gray-800">
      {children}
    </button>
  );
}

export default Button;