import BaseApi from './_baseApi';

interface CourseParams {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
}

class CourseApi extends BaseApi {
  baseUrl: string = '/courses';

  async getCourses(params?: CourseParams) {
    const url = this.buildUrl(this.baseUrl, params);
    const { data } = await this.get(url);
    return data;
  }

  async getCourseById(id: string) {
    const { data } = await this.get(`${this.baseUrl}/${id}`);
    return data;
  }

  async getMyCourses() {
    const { data } = await this.get(`${this.baseUrl}/my`);
    return data;
  }

  async createCourse(dto: FormData) {
    const { data } = await this.post(`${this.baseUrl}`, dto, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  }

  async updateCourse(id: string, dto: FormData) {
    const { data } = await this.patch(`${this.baseUrl}/${id}`, dto, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  }

  async deleteCourse(id: string) {
    const { data } = await this.delete(`${this.baseUrl}/${id}`);
    return data;
  }
}

export default new CourseApi();