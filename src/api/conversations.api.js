import { ApiBase } from './api.base';

export class ConversationsApi extends ApiBase {
  constructor() {
    super();
  }

  async getProjectConversations(projectId) {
    return this.client.get(`/projects/${ projectId }/conversations`);
  }

  async getConversationMessages(projectId, conversationId) {
    return this.client.get(`/projects/${ projectId }/conversations/${ conversationId }/messages`);
  }

  async sendMessage(projectId, conversationId, messageData) {
    return this.client.post(`/projects/${ projectId }/conversations/${ conversationId }/messages`, messageData);
  }
}

export const conversationsApi = new ConversationsApi();
