import BaseApi from './_baseApi';
import type { RegisterEntity, LoginEntity } from '../entities/auth.entity';

class AuthApi extends BaseApi {
  baseUrl: string = '/auth';

  async register(dto: RegisterEntity) {
    const { data } = await this.post(`${this.baseUrl}/register`, dto);
    return data;
  }

  async login(dto: LoginEntity) {
    const { data } = await this.post(`${this.baseUrl}/login`, dto);
    return data;
  }

  async getMe() {
    const { data } = await this.get(`${this.baseUrl}/me`);
    return data;
  }
}

export default new AuthApi();