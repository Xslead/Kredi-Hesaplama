import { RateType } from "../models/LoanRequest";

export class InterestConverter {
  static toMonthly(ratePercent: number, type: RateType): number {
    const r = ratePercent / 100; // yüzde -> ondalık
    if (type === "monthly") return r;
    if (type === "annual-nominal") return r / 12;
    // annual-effective:
    return Math.pow(1 + r, 1 / 12) - 1;
  }
}
