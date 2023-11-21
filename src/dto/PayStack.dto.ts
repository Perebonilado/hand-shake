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

export interface PayWithTransferSuccessDto<T> {
  event: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: T;
    fees_breakdown: null;
    log: null;
    fees: number;
    fees_split: null;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: null;
      country_code: string;
      brand: string;
      reusable: false;
      signature: null;
      account_name: null;
      sender_country: string;
      sender_bank: null;
      sender_bank_account_number: string;
      sender_name: string;
      narration: string;
    };
    customer: {
      id: number;
      first_name: null;
      last_name: null;
      email: string;
      customer_code: string;
      phone: null;
      metadata: null;
      risk_action: string;
      international_format_phone: null;
    };
    plan: {};
    subaccount: {};
    split: {};
    order_id: null;
    paidAt: string;
    requested_amount: number;
    pos_transaction_data: null;
    source: {
      type: string;
      source: string;
      entry_point: string;
      identifier: null;
    };
  };
}

export interface PayWithTransferFailureResponse {
  event: string;
  data: {
    bank_transfer: {
      amount: string;
      message: string;
      message_type: string;
      transaction_id: string;
    };
    customer: {
      first_name: null;
      last_name: null;
      email: string;
      phone: null;
      metadata: null;
      domain: string;
      customer_code: string;
      risk_action: string;
      id: number;
      integration: number;
      createdAt: string;
      updatedAt: string;
    };
  };
}
