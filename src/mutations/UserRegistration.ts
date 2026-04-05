import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import authApi from '../api/auth.api';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/slices/authSlice';
import type { RegisterEntity } from '../entities/auth.entity';

export const useUserRegistration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterEntity) => authApi.register(data),
    onSuccess: (response) => {
      dispatch(setCredentials({ user: response.user, token: response.token }));
      toast.success('Account created successfully!');
      if (response.user.role === 'mentor') {
        navigate('/dashboard/mentor');
      } else {
        navigate('/dashboard/learner');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Registration failed');
    },
  });
};