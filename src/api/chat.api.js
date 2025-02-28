import { ApiBase } from './api.base';

export class ChatApi extends ApiBase {
  constructor() {
    super();
    this.baseUrl = '/chat';
  }

  async getConversations() {
    return this.client.get(`${this.baseUrl}/conversations`);
  }

  async getConversationById(id) {
    return this.client.get(`${this.baseUrl}/conversations/${id}`);
  }

  async createConversation(data) {
    return this.client.post(`${this.baseUrl}/conversations`, data);
  }

  async sendMessage(conversationId, message) {
    return this.client.post(`${this.baseUrl}/conversations/${conversationId}/messages`, message);
  }

  async deleteConversation(id) {
    return this.client.delete(`${this.baseUrl}/conversations/${id}`);
  }
}

export const chatApi = new ChatApi();
