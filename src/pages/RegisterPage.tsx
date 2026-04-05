import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Eye, EyeOff, GraduationCap, BookOpen } from 'lucide-react';
import { useUserRegistration } from '../mutations/UserRegistration';
import { RegisterEntity } from '../entities/auth.entity';
import FormInput from '../base-fields/FormInput';
import Button from '../base-fields/Button';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: register, isPending } = useUserRegistration();

  const initialValues = new RegisterEntity();

  return (
    <div className="min-h-screen bg-[#060d16] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">CoursePlatform</h1>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-[#0d1117] border border-[#30363d] rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Create your account</h2>
          <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">
            Join the community of modern developers.
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={RegisterEntity.yupSchema()}
          onSubmit={(values) => register(values)}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-5">
              <FormInput
                name="name"
                label="Full Name"
                placeholder="John Doe"
              />

              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="john@example.com"
              />

              <FormInput
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-300 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />

              {/* Role Selector */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 text-center">
                  Select Your Path
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {/* Mentor */}
                  <button
                    type="button"
                    onClick={() => setFieldValue('role', 'mentor')}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition ${
                      values.role === 'mentor'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-[#30363d] bg-[#060d16] hover:border-gray-500'
                    }`}
                  >
                    <GraduationCap
                      size={22}
                      className={values.role === 'mentor' ? 'text-blue-400' : 'text-gray-500'}
                    />
                    <div className="text-left">
                      <p className={`text-sm font-semibold ${values.role === 'mentor' ? 'text-white' : 'text-gray-400'}`}>
                        I want to teach
                      </p>
                      <p className="text-xs text-gray-600">Mentor</p>
                    </div>
                  </button>

                  {/* Learner */}
                  <button
                    type="button"
                    onClick={() => setFieldValue('role', 'learner')}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition ${
                      values.role === 'learner'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-[#30363d] bg-[#060d16] hover:border-gray-500'
                    }`}
                  >
                    <BookOpen
                      size={22}
                      className={values.role === 'learner' ? 'text-blue-400' : 'text-gray-500'}
                    />
                    <div className="text-left">
                      <p className={`text-sm font-semibold ${values.role === 'learner' ? 'text-white' : 'text-gray-400'}`}>
                        I want to learn
                      </p>
                      <p className="text-xs text-gray-600">Learner</p>
                    </div>
                  </button>
                </div>
              </div>

              <Button type="submit" isLoading={isPending} fullWidth>
                Create Account
              </Button>

              <p className="text-center text-gray-500 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
                  Sign In
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>

      {/* Footer */}
      <div className="mt-8 flex gap-6 text-xs text-gray-600">
        <span className="cursor-pointer hover:text-gray-400 transition">Terms</span>
        <span className="cursor-pointer hover:text-gray-400 transition">Privacy</span>
        <span className="cursor-pointer hover:text-gray-400 transition">Docs</span>
        <span className="cursor-pointer hover:text-gray-400 transition">Support</span>
      </div>
      <p className="text-xs text-gray-700 mt-2">© 2024 CoursePlatform. The Obsidian Architect.</p>
    </div>
  );
};

export default RegisterPage;