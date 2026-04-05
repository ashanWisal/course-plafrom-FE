import axios, { type AxiosRequestConfig } from 'axios';
import { store } from '../store';

export default class BaseApi {
  private mergeRequestConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    if (!config) config = {};
    if (!config.baseURL) config.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    if (!config.headers) config.headers = {};

    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }

  async post(url: string, body: any, config?: AxiosRequestConfig) {
    config = this.mergeRequestConfig(config);
    return axios.post(url, body, config);
  }

  async get(url: string, config?: AxiosRequestConfig) {
    config = this.mergeRequestConfig(config);
    return axios.get(url, config);
  }

  async patch(url: string, body: any, config?: AxiosRequestConfig) {
    config = this.mergeRequestConfig(config);
    return axios.patch(url, body, config);
  }

  async put(url: string, body: any, config?: AxiosRequestConfig) {
    config = this.mergeRequestConfig(config);
    return axios.put(url, body, config);
  }

  async delete(url: string, body?: any, config?: AxiosRequestConfig) {
    config = this.mergeRequestConfig(config);
    if (body) config.data = body;
    return axios.delete(url, config);
  }

  buildUrl(url: string, params?: any): string {
    return `${url}${this.buildQueryString(params)}`;
  }

  private buildQueryString(params: any): string {
    let qs = '';
    const separator = '&';

    if (params) {
      qs = Object.entries(params)
        .filter(([, value]) => value != null)
        .map(([key, value]) => {
          if (value instanceof Date) return `${key}=${value.toISOString()}`;
          if (value instanceof Array) {
            return value.map((v) => `${key}[]=${encodeURIComponent(v)}`).join(separator);
          }
          return `${key}=${encodeURIComponent(value as string)}`;
        })
        .join(separator);
    }

    return qs ? '?' + qs : qs;
  }
}