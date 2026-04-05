import { useQuery } from '@tanstack/react-query';
import ordersApi from '../api/orders.api';

export const useMyOrders = () => {
  return useQuery({
    queryKey: ['my-orders'],
    queryFn: () => ordersApi.getMyOrders(),
  });
};