export interface CreateDiscountReply {
  readonly code: string;
  readonly validUntil: string;
  readonly factor: number;
}