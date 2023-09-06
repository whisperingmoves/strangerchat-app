export interface VoiceCall {
  conversationId: string;
  messageId: string;
  senderId: string;
  recipientId: string;
  voiceCallRecordId: string;
  startTime: number;
  endTime: number;
  readStatus?: number;
}
