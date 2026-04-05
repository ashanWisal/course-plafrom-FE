import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Upload, LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logout } from '../../../store/slices/authSlice';


interface Props {
  activePage: 'dashboard' | 'courses' | 'upload';
}

const MentorSidebar = ({ activePage }: Props) => {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/mentor' },
    { key: 'courses', label: 'My Courses', icon: BookOpen, path: '/dashboard/mentor/courses' },
    { key: 'upload', label: 'Upload Course', icon: Upload, path: '/courses/upload' },
  ];

  return (
    <div className="w-64 bg-[#0d1117] border-r border-[#30363d] flex flex-col fixed h-full">
      {/* Logo */}
      <div className="p-6 border-b border-[#30363d]">
        <div className="flex items-center gap-2">
          <span className="text-blue-400 font-mono font-bold text-lg">DN</span>
          <span className="text-white font-bold text-lg tracking-tight">DevNest</span>
        </div>
        <p className="text-gray-600 text-xs mt-1 uppercase tracking-widest">Mentor Portal</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.key;
          return (
            <button
              key={item.key}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                  : 'text-gray-500 hover:text-white hover:bg-[#1a2233]'
              }`}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-[#30363d]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white">
            {user?.name?.charAt(0) ?? 'M'}
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{user?.name ?? ''}</p>
            <p className="text-gray-500 text-xs">Mentor Portal</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 hover:text-red-400 text-sm transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default MentorSidebar;