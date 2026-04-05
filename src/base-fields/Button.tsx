interface Props {
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'danger';
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  outline: 'border border-[#30363d] hover:border-gray-500 text-gray-300 hover:text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const Button = ({
  type = 'button',
  isLoading,
  disabled,
  onClick,
  children,
  variant = 'primary',
  fullWidth = false,
}: Props) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        px-6 py-3 rounded-lg font-semibold text-sm tracking-widest uppercase
        transition disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
      `}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;