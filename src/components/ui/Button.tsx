export const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
  >
    {children}
  </button>
);
