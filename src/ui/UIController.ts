import { DomIds } from "./DomIds";
import { Validator } from "../utils/Validator";
import { LoanCalculator } from "../core/LoanCalculator";
import { Currency } from "../utils/Currency";
import { Csv } from "../utils/Csv";
import { LoanRequest, RateType } from "../models/LoanRequest";

const $ = (id: string) => document.getElementById(id)!;

export class UIController {
  private lastSchedule: ReturnType<typeof LoanCalculator.calculate> | null = null;

  init() {
    $(DomIds.calcBtn).addEventListener("click", () => this.onCalc());
    $(DomIds.csvBtn).addEventListener("click", () => this.onCsv());
  }

  private readRequest(): LoanRequest {
    const principal = Number((<HTMLInputElement>$(DomIds.amount)).value);
    const months = Number((<HTMLInputElement>$(DomIds.months)).value);
    const rate = Number((<HTMLInputElement>$(DomIds.rate)).value);
    const rateType = (<HTMLSelectElement>$(DomIds.rateType)).value as RateType;

    Validator.ensurePositiveNumber(principal, "Kredi tutarı");
    Validator.ensurePositiveInt(months, "Vade (ay)");
    Validator.ensureRate(rate);

    return { principal, months, rate, rateType };
  }

  private onCalc() {
    try {
      const req = this.readRequest();
      const res = LoanCalculator.calculate(req);
      this.lastSchedule = res;
      this.renderSummary(res);
      this.renderTable(res);
      ($(DomIds.csvBtn) as HTMLButtonElement).disabled = false;
    } catch (e: any) {
      alert(e?.message ?? "Bilinmeyen hata");
    }
  }

  private renderSummary(res: ReturnType<typeof LoanCalculator.calculate>) {
    $(DomIds.mPayment).textContent = Currency.format(res.monthlyPayment);
    $(DomIds.tPaid).textContent     = Currency.format(res.totalPaid);
    $(DomIds.tInterest).textContent = Currency.format(res.totalInterest);
    $(DomIds.results).hidden = false;
  }

  private renderTable(res: ReturnType<typeof LoanCalculator.calculate>) {
    const tbody = $(DomIds.tbody);
    tbody.innerHTML = "";
    for (const r of res.schedule) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="text-align:left">${r.month}</td>
        <td>${Currency.format(r.payment)}</td>
        <td>${Currency.format(r.interest)}</td>
        <td>${Currency.format(r.principal)}</td>
        <td>${Currency.format(r.balance)}</td>
      `;
      tbody.appendChild(tr);
    }
  }

  private onCsv() {
    if (!this.lastSchedule) return;
    Csv.download("amortizasyon.csv", Csv.toScheduleCsv(this.lastSchedule.schedule));
  }
}
