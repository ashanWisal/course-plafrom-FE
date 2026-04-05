import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { useUserLogin } from '../mutations/UserLogin';
import { LoginEntity } from '../entities/auth.entity';
import FormInput from '../base-fields/FormInput';
import Button from '../base-fields/Button';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useUserLogin();

  const initialValues = new LoginEntity();

  return (
    <div className="min-h-screen bg-[#060d16] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-blue-400 font-mono text-lg font-bold">&lt;&gt;</span>
          <h1 className="text-2xl font-bold text-white tracking-tight">CoursePlatform</h1>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-[#0d1117] border border-[#30363d] rounded-2xl p-8">
        <div className="text-center mb-8">
          <p className="text-xs text-blue-400 uppercase tracking-widest mb-2">
            Architect Your Future
          </p>
          <h2 className="text-4xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-2">
            The platform built by developers, for developers
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={LoginEntity.yupSchema()}
          onSubmit={(values) => login(values)}
        >
          {() => (
            <Form className="space-y-5">
              <FormInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="name@domain.com"
              />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Password
                  </label>
                  <span className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer transition">
                    Forgot?
                  </span>
                </div>
                <FormInput
                  name="password"
                  label=""
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
              </div>

              <Button type="submit" isLoading={isPending} fullWidth>
                Sign In
              </Button>

              <p className="text-center text-gray-500 text-sm">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition"
                >
                  Register
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

export default LoginPage;