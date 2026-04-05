export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'mentor' | 'learner';
  avatar_url?: string;
}

export interface Course {
  _id: string;
  mentor_id: { _id: string; name: string; avatar_url?: string };
  title: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  thumbnail_url: string;
  video_duration: number;
  video_format: string;
  is_published: boolean;
  total_sales: number;
  total_revenue: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  learner_id: string;
  course_id: Course;
  stripe_payment_intent_id: string;
  stripe_status: string;
  amount_paid: number;
  currency: string;
  status: string;
  paid_at: string;
  createdAt: string;
}

export interface Enrollment {
  _id: string;
  learner_id: string;
  course_id: Course;
  order_id: string;
  watch_progress_seconds: number;
  is_completed: boolean;
  last_watched_at: string;
  enrolled_at: string;
}

export interface PaginatedResponse<T> {
  courses: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}