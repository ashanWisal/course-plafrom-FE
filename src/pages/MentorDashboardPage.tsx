import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteCourse } from '../mutations/DeleteCourse';
import MentorSidebar from '../features/dashboard/components/MentorSidebar';
import StatsCard from '../features/dashboard/components/StatsCard';
import RecentCoursesTable from '../features/dashboard/components/RecentCoursesTable';
import ConfirmModal from '../components/common/ConfirmModal';
import { useMentorDashboard } from '../hooks/UserDashboard';

const MentorDashboardPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useMentorDashboard();
  const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourse();

  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  const courses = data?.courses ?? [];

  const totalRevenue = courses.reduce(
    (sum: number, c: any) => sum + (c?.total_revenue ?? 0), 0
  );
  const totalSales = courses.reduce(
    (sum: number, c: any) => sum + (c?.total_sales ?? 0), 0
  );

  const handleEdit = (course: any) => {
    navigate(`/courses/edit/${course?._id ?? ''}`);
  };

  const handleDeleteConfirm = () => {
    if (!courseToDelete) return;
    deleteCourse(courseToDelete, {
      onSuccess: () => setCourseToDelete(null),
    });
  };

  return (
    <div className="min-h-screen bg-[#060d16] flex">
      <MentorSidebar activePage="dashboard" />

      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white uppercase tracking-wide">
            Mentor Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest">
            Performance Overview & Course Management
          </p>
        </div>

        {/* Stats */}
        {isLoading ? (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-[#0d1117] border border-[#30363d] rounded-xl h-24 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <StatsCard
              label="Total Revenue"
              value={`$${totalRevenue.toFixed(2)}`}
              growth="+12% vs last month"
            />
            <StatsCard
              label="Total Sales"
              value={totalSales}
              growth="+5.2% growth"
            />
            <StatsCard
              label="Total Courses"
              value={courses?.length ?? 0}
              subtitle="Active Listing"
            />
          </div>
        )}

        {/* Courses Table */}
        <RecentCoursesTable
          courses={courses}
          onEdit={handleEdit}
          onDelete={(id) => setCourseToDelete(id)}
        />

        {/* Upload CTA */}
        <div className="mt-6 bg-[#0d1117] border border-[#30363d] rounded-xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
              <span className="text-blue-400 text-xl">🚀</span>
            </div>
            <div>
              <p className="text-white font-semibold">Ready to scale your impact?</p>
              <p className="text-gray-500 text-sm">Launch a new course today.</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/courses/upload')}
            className="flex items-center gap-2 bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
          >
            Upload New Course →
          </button>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {courseToDelete && (
        <ConfirmModal
          title="Delete Course"
          message="Are you sure you want to delete this course? This action cannot be undone."
          confirmLabel="Delete"
          isLoading={isDeleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setCourseToDelete(null)}
        />
      )}
    </div>
  );
};

export default MentorDashboardPage;