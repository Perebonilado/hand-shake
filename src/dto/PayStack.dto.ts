

export interface PayWithTransferDto {
  status: boolean;
  message: string;
  data: {
    status: string;
    display_text: string;
    reference: string;
    amount: number;
    account_name: string;
    account_number: string;
    bank: {
      slug: string;
      name: string;
      id: number;
    };
    account_expires_at: string;
  };
}
