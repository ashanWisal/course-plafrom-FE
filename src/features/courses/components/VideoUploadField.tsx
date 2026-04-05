import { useRef, useState } from 'react';
import { Upload, X, FileVideo } from 'lucide-react';
import { useFormikContext } from 'formik';

const VideoUploadField = () => {
  const { setFieldValue, errors, touched } = useFormikContext<any>();
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setFieldValue('video', file);
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleClear = () => {
    setFieldValue('video', null);
    setFileName(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
        Course Video
      </label>

      {!fileName ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-[#30363d] hover:border-blue-500/50 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition bg-[#060d16]"
        >
          <Upload size={32} className="text-blue-400 mb-3" />
          <p className="text-white font-semibold text-sm">
            Drag & drop your video here or{' '}
            <span className="text-blue-400 underline">click to browse</span>
          </p>
          <p className="text-gray-600 text-xs mt-2 uppercase tracking-widest">
            MP4 or WEBM, MAX 100MB, MAX 5 MINUTES
          </p>
        </div>
      ) : (
        <div className="bg-[#060d16] border border-[#30363d] rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <FileVideo size={20} className="text-blue-400 shrink-0" />
            <p className="text-white text-sm font-medium flex-1 truncate">{fileName}</p>
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-500 hover:text-red-400 transition"
            >
              <X size={16} />
            </button>
          </div>
          {preview && (
            <video
              src={preview}
              controls
              className="w-full rounded-lg max-h-48 object-cover"
            />
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {touched?.video && errors?.video && (
        <p className="text-red-400 text-xs mt-1">{errors.video as string}</p>
      )}
    </div>
  );
};

export default VideoUploadField;