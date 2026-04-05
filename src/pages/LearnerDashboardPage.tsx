import { useNavigate } from 'react-router-dom';
import { LogOut, BookOpen, Play, CheckCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { useMyEnrollments } from '../hooks/useEnrollments';

const LearnerDashboardPage = () => {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: enrollments, isLoading } = useMyEnrollments();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const getProgress = (enrollment: any) => {
    const duration = enrollment?.course_id?.video_duration;
    if (!duration || duration === 0) return 0;
    return Math.min(100, Math.round((enrollment.watch_progress_seconds / duration) * 100));
  };

  return (
    <div className="min-h-screen bg-[#060d16] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#0d1117] border-r border-[#30363d] flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-[#30363d]">
          <h1 className="text-blue-400 font-bold text-xl">The Obsidian</h1>
          <p className="text-blue-300 font-bold text-xl">Architect</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20 text-sm font-medium">
            <BookOpen size={16} />
            My Courses
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:text-white hover:bg-[#1a2233] text-sm font-medium transition"
          >
            <Play size={16} />
            Browse Courses
          </button>
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-[#30363d]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white">
              {user?.name?.charAt(0) ?? 'U'}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{user?.name ?? ''}</p>
              <p className="text-gray-500 text-xs">Pro Plan</p>
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

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {user?.name?.split(' ')[0] ?? 'there'}!
            </h1>
            <p className="text-gray-500 mt-1">Continue where you left off</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-5">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Enrolled Courses</p>
            <p className="text-3xl font-bold text-white">{enrollments?.length ?? 0}</p>
          </div>
          <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-5">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Completed</p>
            <p className="text-3xl font-bold text-white">
              {enrollments?.filter((e: any) => e.is_completed).length ?? 0}
            </p>
          </div>
          <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-5">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">In Progress</p>
            <p className="text-3xl font-bold text-white">
              {enrollments?.filter((e: any) => !e.is_completed).length ?? 0}
            </p>
          </div>
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#0d1117] border border-[#30363d] rounded-xl h-48 animate-pulse" />
            ))}
          </div>
        ) : enrollments?.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={48} className="text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No courses yet.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 text-blue-400 hover:text-blue-300 text-sm transition"
            >
              Browse courses →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments?.map((enrollment: any) => {
              const course = enrollment?.course_id;
              const progress = getProgress(enrollment);
              return (
                <div
                  key={enrollment?._id}
                  className="bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden hover:border-blue-500/50 transition"
                >
                  <div className="flex gap-4 p-4">
                    {/* Thumbnail */}
                    <div className="w-24 h-16 rounded-lg overflow-hidden bg-[#060d16] shrink-0">
                      {course?.thumbnail_url ? (
                        <img
                          src={course.thumbnail_url}
                          alt={course?.title ?? ''}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen size={20} className="text-gray-700" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs text-blue-400 uppercase tracking-widest font-semibold">
                            {course?.category ?? ''}
                          </span>
                          <h3 className="text-white font-bold text-sm mt-0.5 line-clamp-1">
                            {course?.title ?? ''}
                          </h3>
                        </div>
                        {enrollment?.is_completed && (
                          <CheckCircle size={16} className="text-green-400 shrink-0" />
                        )}
                      </div>

                      {/* Progress */}
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">Progress</span>
                          <span className="text-xs text-gray-400 font-medium">{progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#1a2233] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Button */}
                      <button
                        onClick={() => navigate(`/courses/${course?._id}`)}
                        className="mt-3 flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition font-medium"
                      >
                        <Play size={12} />
                        {enrollment?.is_completed ? 'Review Course' : 'Continue Watching'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnerDashboardPage;