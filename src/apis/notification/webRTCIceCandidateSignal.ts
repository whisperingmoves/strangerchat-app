export interface WebRTCIceCandidateSignal {
  opponentUserId: string;
  candidate: string;
  sdpMLineIndex: number;
  sdpMid: string;
}
