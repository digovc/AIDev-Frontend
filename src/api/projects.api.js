import { ApiBase } from './api.base';

export class ProjectsApi extends ApiBase {
  constructor() {
    super();
    this.baseUrl = '/projects';
  }

  async getAllProjects() {
    return this.get(this.baseUrl);
  }

  async getProjectById(id) {
    return this.get(`${this.baseUrl}/${id}`);
  }

  async createProject(projectData) {
    return this.post(this.baseUrl, projectData);
  }

  async updateProject(id, projectData) {
    return this.put(`${this.baseUrl}/${id}`, projectData);
  }

  async deleteProject(id) {
    return this.delete(`${this.baseUrl}/${id}`);
  }
}

export const projectsApi = new ProjectsApi();
