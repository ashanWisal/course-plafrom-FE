import BaseApi from './_baseApi';

class DashboardApi extends BaseApi {
  baseUrl: string = '/dashboard';

  async getMentorDashboard() {
    const { data } = await this.get(`${this.baseUrl}/mentor`);
    return data;
  }

  async getLearnerDashboard() {
    const { data } = await this.get(`${this.baseUrl}/learner`);
    return data;
  }
}

export default new DashboardApi();