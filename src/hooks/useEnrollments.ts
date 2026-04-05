import { useQuery } from '@tanstack/react-query';
import enrollmentApi from '../api/enrollments.api';

export const useMyEnrollments = () => {
  return useQuery({
    queryKey: ['my-enrollments'],
    queryFn: () => enrollmentApi.getMyEnrollments(),
  });
};



export const useCheckEnrollment = (courseId: string) => {
  return useQuery({
    queryKey: ['enrollment-check', courseId],
    queryFn: () => enrollmentApi.getMyEnrollments(),
    enabled: !!courseId,
    select: (data) => {
      return (
        data?.find((e: any) => {
          const id = e?.course_id?._id ?? e?.course_id;
          return String(id) === String(courseId);
        }) ?? null
      );
    },
  });
};