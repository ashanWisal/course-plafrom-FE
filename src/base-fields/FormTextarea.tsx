import { Field, ErrorMessage } from 'formik';

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}

const FormTextarea = ({ name, label, placeholder, rows = 4 }: Props) => {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
        {label}
      </label>
      <Field
        as="textarea"
        name={name}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition resize-none"
      />
      <ErrorMessage name={name} component="p" className="text-red-400 text-xs mt-1" />
    </div>
  );
};

export default FormTextarea;