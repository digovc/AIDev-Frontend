import { ApiBase } from './api.base';

export class TasksApi extends ApiBase {
  constructor() {
    super();
    this.baseUrl = '/tasks';
  }

  async getTasksByProject(projectId) {
    return this.client.get(`${ this.baseUrl }/by-project/${ projectId }`);
  }

  async getTaskById(taskId) {
    return this.client.get(`${ this.baseUrl }/${ taskId }`);
  }

  async createTask(taskData) {
    return this.client.post(this.baseUrl, taskData);
  }

  async updateTask(taskId, taskData) {
    return this.client.put(`${ this.baseUrl }/${ taskId }`, taskData);
  }

  async deleteTask(taskId) {
    return this.client.delete(`${ this.baseUrl }/${ taskId }`);
  }

  async runTask(taskId) {
    return this.client.post(`${ this.baseUrl }/run/${ taskId }`);
  }
}

export const tasksApi = new TasksApi();
