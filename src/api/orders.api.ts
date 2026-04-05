import BaseApi from './_baseApi';

class OrderApi extends BaseApi {
  baseUrl: string = '/orders';

  async createOrder(course_id: string) {
    const { data } = await this.post(`${this.baseUrl}`, { course_id });
    return data;
  }

  async confirmOrder(orderId: string) {
    const { data } = await this.post(`${this.baseUrl}/${orderId}/confirm`, {});
    return data;
  }

  async getMyOrders() {
    const { data } = await this.get(`${this.baseUrl}/my`);
    return data;
  }
}

export default new OrderApi();