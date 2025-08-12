export type RateType = "monthly" | "annual-nominal" | "annual-effective";

export interface LoanRequest {
  principal: number;   // kredi tutarı (P)
  months: number;      // vade (n)
  rate: number;        // yüzde olarak (örn: 3.25)
  rateType: RateType;  // aylık / yıllık nominal / yıllık efektif
}
