export interface PayWithTransferPayloadModel<T> {
  email: string;
  amount: string;
  bank_transfer: {
    account_expires_at: string;
  };
  metaData: T;
}

export interface PayWithTransferModel {
  accountName: string;
  accountNumber: string;
  expiresAt: string;
  amount: number;
  reference: string;
  status: string;
  bankName: string;
}

export interface MetaDataModel {
  deliverableId: string
}