interface Props {
  label: string;
  value: string | number;
  subtitle?: string;
  growth?: string;
}

const StatsCard = ({ label, value, subtitle, growth }: Props) => {
  return (
    <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-5">
      {growth && (
        <p className="text-green-400 text-xs font-semibold mb-1">{growth}</p>
      )}
      <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
      {subtitle && (
        <p className="text-gray-600 text-xs mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default StatsCard;