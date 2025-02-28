import axios from 'axios';

export class ApiBase {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL
    });
  }
}
