import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import axios from 'axios';
import MentorSidebar from '../features/dashboard/components/MentorSidebar';
import { CreateCourseEntity } from '../entities/course.entity';
import toast from 'react-hot-toast';
import { store } from '../store';
import FormTextarea from '../base-fields/FormTextarea';
import FormSelect from '../base-fields/FormSelect';
import FormInput from '../base-fields/FormInput';
import TagsInput from '../base-fields/TagsInput';
import VideoUploadField from '../features/courses/components/VideoUploadField';
import Button from '../base-fields/Button';

const CATEGORIES = [
  { label: 'Backend', value: 'Backend' },
  { label: 'Frontend', value: 'Frontend' },
  { label: 'DevOps', value: 'DevOps' },
  { label: 'Architecture', value: 'Architecture' },
  { label: 'Database', value: 'Database' },
];

const UploadCoursePage = () => {
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (values: CreateCourseEntity) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category', values.category);
      formData.append('tags', values.tags);
      formData.append('price', String(values.price));
      if (values.video) formData.append('video', values.video);

      const token = store.getState().auth.token;
      await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/courses`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token ?? ''}`,
          },
          onUploadProgress: (e) => {
            const percent = Math.round(((e.loaded ?? 0) * 100) / (e.total ?? 1));
            setUploadProgress(percent);
          },
        }
      );

      toast.success('Course published successfully!');
      navigate('/dashboard/mentor');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to create course');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#060d16] flex">
      <MentorSidebar activePage="upload" />

      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Upload New Course</h1>
          <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest">
            Knowledge Architecture Studio
          </p>
        </div>

        <div className="max-w-2xl">
          <Formik
            initialValues={new CreateCourseEntity()}
            validationSchema={CreateCourseEntity.yupSchema()}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-6">
                <FormInput
                  name="title"
                  label="Course Title"
                  placeholder="e.g. Master Microservices"
                />

                <FormTextarea
                  name="description"
                  label="Description"
                  placeholder="Describe your course..."
                  rows={5}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormSelect
                    name="category"
                    label="Category"
                    options={CATEGORIES}
                    placeholder="Select category"
                  />
                  <FormInput
                    name="price"
                    label="Price (USD)"
                    type="number"
                    placeholder="0.00"
                  />
                </div>

                <TagsInput />

                <VideoUploadField />

                {/* Upload Progress */}
                {isUploading && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400 flex items-center gap-2">
                        <span className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full animate-spin" />
                        Uploading video...
                      </span>
                      <span className="text-xs text-gray-400">{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1a2233] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  isLoading={isUploading}
                  fullWidth
                >
                  Publish Course
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UploadCoursePage;