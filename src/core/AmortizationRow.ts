export interface AmortizationRow {
  month: number;
  payment: number;   // o ay ödenen toplam taksit
  interest: number;  // o ayki faiz
  principal: number; // o ay ödenen anapara
  balance: number;   // kalan bakiye
}
