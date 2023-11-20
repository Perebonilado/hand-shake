export interface PayWithTransferPayloadModel {
  email: string;
  amount: string;
  bank_transfer: {
    account_expires_at: string;
  };
}

export interface PayWithTransferModel {
  accountName: string;
  accountNumber: string;
  expiresAt: string;
  amount: number;
  reference: string;
  status: string;
  bankName: string
}
