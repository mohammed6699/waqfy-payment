export type PaymentResults = 'success' | 'failed' | 'pending';

interface StatusConfig {
  icon: string;
  iconClass: string; // text color of the icon
  boxClass: string; // light background of the boxes
  title: string;
  message: string;
  showAmount: boolean;
  showRating: boolean;
  showReceipt: boolean;
  primaryLabel: string;
}

export const STATUS_CONFIG: Record<PaymentResults, StatusConfig> = {
  success: {
    icon: 'check_circle',
    iconClass: 'text-green-700',
    boxClass: 'bg-green-50',
    title: 'شكراً لمساهمتك، تمت العملية بنجاح',
    message: 'تم الربط بنجاح',
    showAmount: true,
    showRating: true,
    showReceipt: true,
    primaryLabel: 'عودة إلى الرئيسية',
  },
  failed: {
    icon: 'cancel',
    iconClass: 'text-red-700',
    boxClass: 'bg-red-50',
    title: 'فشلت عملية الدفع',
    message: 'لم يتم خصم أي مبلغ، يرجى المحاولة مرة أخرى',
    showAmount: false,
    showRating: false,
    showReceipt: false,
    primaryLabel: 'إعادة المحاولة',
  },
  pending: {
    icon: 'schedule',
    iconClass: 'text-amber-600',
    boxClass: 'bg-amber-50',
    title: 'العملية قيد المعالجة',
    message: 'سنقوم بإشعارك فور اكتمال العملية',
    showAmount: true,
    showRating: false,
    showReceipt: false,
    primaryLabel: 'عودة إلى الرئيسية',
  },
};
