import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import coursesApi from '../api/courses.api';

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => coursesApi.deleteCourse(id),
    onSuccess: () => {
      toast.success('Course deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['my-courses'] });
      queryClient.invalidateQueries({ queryKey: ['mentor-dashboard'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete course');
    },
  });
};