export interface CreateDiscountRequest {
  readonly code: string;
  readonly validUntil: string;
  readonly factor: number;
}