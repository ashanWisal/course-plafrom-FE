import BaseApi from './_baseApi';

class EnrollmentApi extends BaseApi {
  baseUrl: string = '/enrollments';

  async getMyEnrollments() {
    const { data } = await this.get(`${this.baseUrl}/my`);
    return data;
  }

  async getEnrollmentByCourse(courseId: string) {
  const { data } = await this.get(`${this.baseUrl}/my`);
  return data?.find((e: any) => e?.course_id?._id === courseId) ?? null;
}


  async updateProgress(enrollmentId: string, watch_progress_seconds: number) {
    const { data } = await this.patch(`${this.baseUrl}/${enrollmentId}`, {
      watch_progress_seconds,
    });
    return data;
  }
}

export default new EnrollmentApi();