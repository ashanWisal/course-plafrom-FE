import * as Yup from 'yup';

export class CreateCourseEntity {
  title: string = '';
  description: string = '';
  category: string = '';
  tags: string = '';
  price: number = 0;
  video: File | null = null;

  static yupSchema() {
    return Yup.object().shape({
      title: Yup.string()
        .min(5, 'Min 5 characters')
        .max(100, 'Max 100 characters')
        .required('Title is required'),
      description: Yup.string()
        .min(20, 'Min 20 characters')
        .max(1000, 'Max 1000 characters')
        .required('Description is required'),
      category: Yup.string()
        .required('Category is required'),
      tags: Yup.string()
        .required('At least one tag is required'),
      price: Yup.number()
        .typeError('Price must be a number')
        .min(0, 'Price must be positive')
        .max(999, 'Max price is $999')
        .required('Price is required'),
      video: Yup.mixed()
        .required('Video file is required')
        .test('fileFormat', 'Only mp4 or webm allowed', (value) => {
          if (!value) return false;
          const file = value as File;
          return ['video/mp4', 'video/webm'].includes(file.type);
        })
        .test('fileSize', 'Max file size is 100MB', (value) => {
          if (!value) return false;
          const file = value as File;
          return file.size <= 100 * 1024 * 1024;
        }),
    });
  }
}

export class UpdateCourseEntity {
  title: string = '';
  description: string = '';
  category: string = '';
  tags: string = '';
  price: number = 0;

  static yupSchema() {
    return Yup.object().shape({
      title: Yup.string()
        .min(5, 'Min 5 characters')
        .max(100, 'Max 100 characters')
        .required('Title is required'),
      description: Yup.string()
        .min(20, 'Min 20 characters')
        .max(1000, 'Max 1000 characters')
        .required('Description is required'),
      category: Yup.string()
        .required('Category is required'),
      tags: Yup.string()
        .required('At least one tag is required'),
      price: Yup.number()
        .typeError('Price must be a number')
        .min(0, 'Price must be positive')
        .max(999, 'Max price is $999')
        .required('Price is required'),
    });
  }
}