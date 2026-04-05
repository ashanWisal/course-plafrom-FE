import { Field, ErrorMessage } from 'formik';

interface Props {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  rightElement?: React.ReactNode;
}

const FormInput = ({ name, label, type = 'text', placeholder, rightElement }: Props) => {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
        {label}
      </label>
      <div className="relative">
        <Field
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition pr-12"
        />
        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      <ErrorMessage name={name} component="p" className="text-red-400 text-xs mt-1" />
    </div>
  );
};

export default FormInput;