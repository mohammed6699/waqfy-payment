// GET response wrapper
export interface QuickPayment {
  result: ResultPayment[];
  success: boolean;
  errors: string[];
}

export interface ResultPayment {
  amount: number;
  id: number;
  lastModifiedAt: string;
  lastModifiedBy: string;
}

// POST request body for PrepareQuickDonation
export interface QuickDonationRequest {
  amount: number;
  id: number;
  paymentMethod: number;
}

export interface QuickPaymentDraft {
  result: ResultResponse;
}

export interface ResultResponse {
  paymentTransactionId: string;
}

export interface CreateQuickPaymentDraftRequest {
  amount: number;
}
export interface PaymentDraftResult {
  //   { "result": { "paymentTransactionId": "…", "source": 1, "amount": 100, "hasDeduction": false,
  //   "nameAr": "منتج", "nameEn": "Product"
  // }, "success": true, "errors": []
  // }
  result: {
    paymentTransactionId: string;
  };
  success: boolean;
  errors: string[];
}

export interface PaymentDraftDetails {
  // "paymentTransactionId": "…", "source": 1, "amount": 100, "hasDeduction": false,
  //"nameAr": "منتج", "nameEn": "Product"
  paymentTransactionId: string;
  source: number;
  amount: number;
  hasDeduction: number;
  nameAr: string;
  nameEn: string;
}

export interface PaymentCheckoutRequest {
  paymentTransactionId: string;
  paymentMethod: number;
}

export interface PaymentTransactionResponse {
  // { paymentTransactionId, checkoutId, integrityKey }
  paymentTransactionId: string;
  checkoutId?: string;
  integrityKey?: string;
}

export interface VerifyPayment {
  // { "paymentTransactionId": "<GUID>", "cartId": null }
  paymentTransactionId: string;
  cartId?: number
}
export interface VerifyPaymentResponse {
  // isSuccess: true | false;
  isSuccess: boolean
}
export interface SuccessPaymentResponse {
  // | `paymentTransactionId` | |
  // | **`amount`** | amount paid |
  // | `hasMobileNumber` | `false` ⇒ show mobile binding form |
  // | `rate` | **Product only**: current rating (0 = not rated) |
  paymentTransactionId: string;
  amount: number;
  hasMobileNumber: boolean;
  rate: number
}