import { useQuery } from '@tanstack/react-query';
import coursesApi from '../api/courses.api';

interface CourseParams {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
}

export const useCourses = (params?: CourseParams) => {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: () => coursesApi.getCourses(params),
  });
};

export const useCourseById = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => coursesApi.getCourseById(id),
    enabled: !!id,
  });
};

export const useMyCourses = () => {
  return useQuery({
    queryKey: ['my-courses'],
    queryFn: () => coursesApi.getMyCourses(),
  });
};