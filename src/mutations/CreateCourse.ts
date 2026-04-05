import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import coursesApi from '../api/courses.api';

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: FormData) => coursesApi.createCourse(data),
    onSuccess: () => {
      toast.success('Course created successfully!');
      queryClient.invalidateQueries({ queryKey: ['my-courses'] });
      navigate('/dashboard/mentor');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create course');
    },
  });
};