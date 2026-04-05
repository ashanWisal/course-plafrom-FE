import CourseRowItem from "./CourseRowItem";

interface Props {
  courses: any[];
  onEdit: (course: any) => void;
  onDelete: (id: string) => void;
}

const RecentCoursesTable = ({ courses, onEdit, onDelete }: Props) => {
  return (
    <div className="bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#30363d]">
        <h2 className="text-white font-bold">Recent Courses</h2>
        <button className="text-blue-400 hover:text-blue-300 text-sm transition">
          View All
        </button>
      </div>

      {courses?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">No courses yet.</p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#30363d]">
              <th className="text-left text-xs text-gray-500 uppercase tracking-widest px-4 py-3">
                Thumbnail / Title
              </th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-widest px-4 py-3">
                Sales
              </th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-widest px-4 py-3">
                Revenue
              </th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-widest px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((course: any) => (
              <CourseRowItem
                key={course?._id}
                course={course}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentCoursesTable;