export interface TokenResponse {
  status: number;
  data: string;
}

export interface PaymentDataResponse {
  data: {
    amount: number;
    email: string;
    retries: number;
    transferCode: string;
  };
}
