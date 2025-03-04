import { ApiBase } from './api.base';

export class ConversationsApi extends ApiBase {
  constructor() {
    super();
    this.baseUrl = '/conversations';
  }

  getById(id) {
    return this.client.get(`${ this.baseUrl }/${ id }`);
  }

  async createConversation(projectId) {
    return this.client.post(this.baseUrl, { projectId });
  }

  async sendMessage(conversationId, messageData) {
    return this.client.post(`${ this.baseUrl }/${ conversationId }/messages`, messageData);
  }
}

export const conversationsApi = new ConversationsApi();
