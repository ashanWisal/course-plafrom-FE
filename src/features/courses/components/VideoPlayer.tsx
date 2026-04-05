import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import enrollmentApi from '../../../api/enrollments.api';

interface Props {
  courseId: string;
  enrollmentId: string;
  lastWatchedSeconds?: number;
}

const VideoPlayer = ({ courseId, enrollmentId, lastWatchedSeconds = 0 }: Props) => {
  const { token } = useAppSelector((s) => s.auth);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const streamUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/stream/${courseId}`;

  useEffect(() => {
    if (videoRef.current && lastWatchedSeconds > 0) {
      videoRef.current.currentTime = lastWatchedSeconds;
    }
  }, [lastWatchedSeconds]);

  const lastSavedRef = useRef<number>(0);

const handleTimeUpdate = () => {
  const currentTime = Math.floor(videoRef.current?.currentTime ?? 0);

  // Only save if at least 5 seconds have passed since last save
  if (currentTime - lastSavedRef.current < 5) return;

  lastSavedRef.current = currentTime;

  if (debounceRef.current) clearTimeout(debounceRef.current);
  debounceRef.current = setTimeout(async () => {
    try {
      console.log('saving progress:', currentTime);
      await enrollmentApi.updateProgress(enrollmentId, currentTime);
    } catch (err) {
      console.error('progress save failed:', err);
    }
  }, 500);
};

  if (error) {
    return (
      <div className="aspect-video bg-[#060d16] rounded-xl flex items-center justify-center border border-red-500/20">
        <div className="text-center">
          <p className="text-red-400 font-semibold">Failed to load video</p>
          <p className="text-gray-500 text-sm mt-1">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-black rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        onTimeUpdate={handleTimeUpdate}
        onError={() => setError(true)}
      >
        <source
          src={`${streamUrl}?token=${token ?? ''}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;