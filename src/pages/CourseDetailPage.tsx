import { useParams, useNavigate } from "react-router-dom";
import { Clock, Tag, Users, Play } from "lucide-react";
import Navbar from "../components/common/Navbar";
import { useCourseById } from "../hooks/useCourses";
import { useAppSelector } from "../store/hooks";
import { useState } from "react";
import PaymentModal from "../components/common/PaymentModal";
import Button from "../base-fields/Button";
import { useCheckEnrollment } from "../hooks/useEnrollments";
import VideoPlayer from "../features/courses/components/VideoPlayer";
import { UserRole } from "../enums/user.enum";

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading } = useCourseById(id ?? "");
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const { data: enrollment } = useCheckEnrollment(id ?? "");
  const isEnrolled = !!enrollment;

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "0 minutes";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes} minutes`;
  };

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setShowPayment(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060d16] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-[#060d16]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <span className="inline-flex items-center gap-1.5 bg-blue-600/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30 mb-4">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              {course?.category ?? "Uncategorized"}
            </span>

            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              {course?.title ?? ""}
            </h1>

            {/* Mentor */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white">
                {course?.mentor_id?.name?.charAt(0) ?? "M"}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">
                  Course Mentor
                </p>
                <p className="text-white font-semibold">
                  {course?.mentor_id?.name ?? "Unknown"}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {course?.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="text-sm bg-[#1a2233] text-gray-300 px-3 py-1 rounded-lg border border-[#30363d]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-6 mb-8">
              <h2 className="text-white font-bold text-lg mb-3">
                About this Course
              </h2>
              <p className="text-gray-400 leading-relaxed text-base">
                {course?.description ?? "No description available."}
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4">
                <Clock size={20} className="text-blue-400 mb-2" />
                <p className="text-white font-bold">
                  {formatDuration(course?.video_duration)}
                </p>
                <p className="text-gray-500 text-xs">On-demand video</p>
              </div>
              <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4">
                <Users size={20} className="text-blue-400 mb-2" />
                <p className="text-white font-bold">
                  {course?.total_sales ?? 0}
                </p>
                <p className="text-gray-500 text-xs">Students enrolled</p>
              </div>
              <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4">
                <Tag size={20} className="text-blue-400 mb-2" />
                <p className="text-white font-bold">
                  {course?.video_format?.toUpperCase() ?? "MP4"}
                </p>
                <p className="text-gray-500 text-xs">Video format</p>
              </div>
            </div>
          </div>

          {/* Right - Enrollment Card */}
<div className="lg:col-span-1">
  <div className="sticky top-24 bg-[#0d1117] border border-[#30363d] rounded-2xl overflow-hidden">

    {/* Video Player OR Thumbnail */}
    {isEnrolled && enrollment ? (
      <div className="p-4">
        <VideoPlayer
          courseId={course?._id ?? ''}
          enrollmentId={enrollment?._id ?? ''}
          lastWatchedSeconds={enrollment?.watch_progress_seconds ?? 0}
        />
        {/* Progress */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Your Progress</span>
            <span className="text-xs text-gray-400 font-medium">
              {Math.min(100, Math.round(
                ((enrollment?.watch_progress_seconds ?? 0) / (course?.video_duration ?? 1)) * 100
              ))}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#1a2233] rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{
                width: `${Math.min(100, Math.round(
                  ((enrollment?.watch_progress_seconds ?? 0) / (course?.video_duration ?? 1)) * 100
                ))}%`
              }}
            />
          </div>
        </div>
      </div>
    ) : (
      <div className="relative aspect-video bg-[#060d16] overflow-hidden">
        {course?.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course?.title ?? ''}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Play size={40} className="text-gray-700" />
          </div>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
            <Play size={20} className="text-white ml-1" />
          </div>
          <p className="text-xs text-gray-300 uppercase tracking-widest mt-3">
            Preview This Course
          </p>
        </div>
      </div>
    )}

    {/* Price + Enroll */}
    <div className="p-6">
      {isEnrolled ? (
        <div className="text-center py-2">
          <p className="text-green-400 font-semibold text-sm">✓ You are enrolled</p>
          <p className="text-gray-500 text-xs mt-1">Watch the video above</p>
        </div>
      ) : (
        <>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-white">
              ${course?.price?.toFixed(2) ?? '0.00'}
            </span>
          </div>
          {user?.role === UserRole.MENTOR ? (
            <p className="text-center text-gray-500 text-sm py-2 border border-[#30363d] rounded-lg">
              Mentors cannot enroll in courses
            </p>
          ) : (
            <Button fullWidth onClick={handleEnroll}>
              Enroll Now
            </Button>
          )}
          <p className="text-center text-gray-600 text-xs mt-3">
            30-day money-back guarantee
          </p>
        </>
      )}

      {/* Course Includes */}
      <div className="mt-6 space-y-3 border-t border-[#30363d] pt-6">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">
          This course includes
        </p>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <Clock size={14} className="text-blue-400 shrink-0" />
          <span>{formatDuration(course?.video_duration)} of on-demand video</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <Tag size={14} className="text-blue-400 shrink-0" />
          <span>Certificate of completion</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <Users size={14} className="text-blue-400 shrink-0" />
          <span>Lifetime access to updates</span>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>

      {showPayment && course && (
        <PaymentModal course={course} onClose={() => setShowPayment(false)} />
      )}
    </div>
  );
};

export default CourseDetailPage;
