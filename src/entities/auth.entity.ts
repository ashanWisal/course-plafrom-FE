import * as Yup from 'yup';

export class RegisterEntity {
  name: string = '';
  email: string = '';
  password: string = '';
  role: 'mentor' | 'learner' = 'learner';

  static yupSchema() {
    return Yup.object().shape({
      name: Yup.string()
        .min(2, 'Min 2 characters')
        .max(50, 'Max 50 characters')
        .required('Full name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Min 6 characters')
        .max(50, 'Max 50 characters')
        .required('Password is required'),
      role: Yup.mixed<'mentor' | 'learner'>()
        .oneOf(['mentor', 'learner'], 'Invalid role')
        .required('Please select a role'),
    });
  }
}

export class LoginEntity {
  email: string = '';
  password: string = '';

  static yupSchema() {
    return Yup.object().shape({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Min 6 characters')
        .required('Password is required'),
    });
  }
}