import { Link } from 'react-router-dom';
import { Clock, Tag } from 'lucide-react';
import type { Course } from '../../types';

interface Props {
  course: Course;
}

const CourseCard = ({ course }: Props) => {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden hover:border-blue-500/50 transition group">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[#060d16]">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Tag size={32} className="text-gray-700" />
          </div>
        )}
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-blue-600/90 text-white text-xs font-semibold px-2 py-1 rounded-md uppercase tracking-wide">
          {course.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold text-base leading-snug mb-2 line-clamp-2 group-hover:text-blue-300 transition">
          {course.title}
        </h3>

        {/* Mentor */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
            {course.mentor_id?.name?.charAt(0) || 'M'}
          </div>
          <span className="text-gray-500 text-xs">{course.mentor_id?.name || 'Mentor'}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-[#1a2233] text-gray-400 px-2 py-0.5 rounded-md border border-[#30363d]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <Clock size={12} />
            <span>{formatDuration(course.video_duration)}</span>
          </div>
          <span className="text-white font-bold text-lg">${course.price.toFixed(2)}</span>
        </div>

        <Link
          to={`/courses/${course._id}`}
          className="mt-4 block w-full text-center text-sm font-semibold text-gray-300 border border-[#30363d] hover:border-blue-500 hover:text-blue-400 py-2 rounded-lg transition"
        >
          View Course →
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;