import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ordersApi from '../api/orders.api';

export const useConfirmOrder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => ordersApi.confirmOrder(orderId),
    onSuccess: () => {
      toast.success('Enrollment confirmed!');
      queryClient.invalidateQueries({ queryKey: ['my-enrollments'] });
      navigate('/dashboard/learner');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to confirm order');
    },
  });
};