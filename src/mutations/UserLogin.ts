import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import authApi from '../api/auth.api';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/slices/authSlice';
import type { LoginEntity } from '../entities/auth.entity';

export const useUserLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginEntity) => authApi.login(data),
    onSuccess: (response) => {
      dispatch(setCredentials({ user: response.user, token: response.token }));
      toast.success('Welcome back!');
      if (response.user.role === 'mentor') {
        navigate('/dashboard/mentor');
      } else {
        navigate('/dashboard/learner');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Login failed');
    },
  });
};