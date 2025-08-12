import { AmortizationRow } from "../core/AmortizationRow";

export interface LoanResult {
  monthlyPayment: number;   // A
  totalPaid: number;        // A*n
  totalInterest: number;    // totalPaid - P
  schedule: AmortizationRow[]; // amortizasyon satırları
}
