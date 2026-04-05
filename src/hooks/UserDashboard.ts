import { useQuery } from '@tanstack/react-query';
import dashboardApi from '../api/dashboard.api';

export const useMentorDashboard = () => {
  return useQuery({
    queryKey: ['mentor-dashboard'],
    queryFn: () => dashboardApi.getMentorDashboard(),
  });
};

export const useLearnerDashboard = () => {
  return useQuery({
    queryKey: ['learner-dashboard'],
    queryFn: () => dashboardApi.getLearnerDashboard(),
  });
};