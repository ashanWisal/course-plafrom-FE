import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { UserRole } from '../../enums/user.enum';

const Navbar = () => {
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleDashboard = () => {
    if (user?.role === UserRole.MENTOR) {
      navigate('/dashboard/mentor');
    } else {
      navigate('/dashboard/learner');
    }
  };

return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#060d16]/80 backdrop-blur-md border-b border-[#30363d]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-blue-400 font-mono font-bold text-lg">DN</span>
          <span className="text-white font-bold text-lg tracking-tight">CoursePlatform</span>
        </Link>

        {/* Center */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-blue-400 text-sm font-medium border-b-2 border-blue-400 pb-0.5"
          >
            Browse Courses
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 ml-auto">
          {isAuthenticated ? (
            <>
              <button
                onClick={handleDashboard}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
              >
                <LayoutDashboard size={16} />
                <span className="hidden md:inline">Dashboard</span>
              </button>
              <div className="w-px h-4 bg-[#30363d]" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition"
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-400 hover:text-white transition px-4 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;