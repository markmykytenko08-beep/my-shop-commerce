type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-gray-800"
    >
      {children}
    </button>
  );
}

export default Button;