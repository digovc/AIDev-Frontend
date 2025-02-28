import { ApiBase } from './api.base';

export class ConversationsApi extends ApiBase {
  constructor() {
    super();
    this.baseUrl = '/conversations';
  }

  async createConversation(conversationData) {
    return this.client.post(this.baseUrl, conversationData);
  }


  async sendMessage(conversationId, messageData) {
    return this.client.post(`${ this.baseUrl }/${ conversationId }/messages`, messageData);
  }
}

export const conversationsApi = new ConversationsApi();
