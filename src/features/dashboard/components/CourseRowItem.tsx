import { Pencil, Trash2 } from 'lucide-react';

interface Props {
  course: any;
  onEdit: (course: any) => void;
  onDelete: (id: string) => void;
}

const CourseRowItem = ({ course, onEdit, onDelete }: Props) => {
  return (
    <tr className="border-b border-[#30363d] hover:bg-[#1a2233]/50 transition">
      {/* Thumbnail + Title */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-8 rounded-lg overflow-hidden bg-[#060d16] shrink-0">
            {course?.thumbnail_url ? (
              <img
                src={course.thumbnail_url}
                alt={course?.title ?? ''}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#1a2233]" />
            )}
          </div>
          <div>
            <p className="text-white text-sm font-semibold line-clamp-1">
              {course?.title ?? ''}
            </p>
            <p className="text-gray-500 text-xs">
              {course?.category ?? ''} · {course?.tags?.[0] ?? ''}
            </p>
          </div>
        </div>
      </td>

      {/* Sales */}
      <td className="py-4 px-4 text-gray-400 text-sm">
        {course?.total_sales ?? 0}
      </td>

      {/* Revenue */}
      <td className="py-4 px-4 text-green-400 text-sm font-semibold">
        ${((course?.total_revenue ?? 0)).toFixed(2)}
      </td>

      {/* Actions */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(course)}
            className="text-gray-500 hover:text-blue-400 transition"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(course?._id ?? '')}
            className="text-gray-500 hover:text-red-400 transition"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CourseRowItem;