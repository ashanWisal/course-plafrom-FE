import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ordersApi from '../api/orders.api';

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (course_id: string) => ordersApi.createOrder(course_id),
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create order');
    },
  });
};