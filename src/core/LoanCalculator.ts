import { LoanRequest } from "../models/LoanRequest";
import { LoanResult } from "../models/LoanResult";
import { InterestConverter } from "./InterestConverter";
import { AmortizationRow } from "./AmortizationRow";

export class LoanCalculator {
  static calculate(req: LoanRequest): LoanResult {
    const r = InterestConverter.toMonthly(req.rate, req.rateType);
    const n = req.months;
    const P = req.principal;

    const monthlyPayment = (r === 0) ? (P / n)
      : (P * r) / (1 - Math.pow(1 + r, -n));

    const schedule: AmortizationRow[] = [];
    let balance = P;

    for (let m = 1; m <= n; m++) {
      const interest = balance * r;
      let principal = monthlyPayment - interest;
      if (m === n) principal = balance;     // yuvarlama düzeltmesi
      balance = Math.max(0, balance - principal);

      schedule.push({
        month: m,
        payment: monthlyPayment,
        interest,
        principal,
        balance
      });
    }

    const totalPaid = schedule.reduce((s, r) => s + r.payment, 0);
    const totalInterest = totalPaid - P;

    return { monthlyPayment, totalPaid, totalInterest, schedule };
  }
}
