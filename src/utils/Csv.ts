import { AmortizationRow } from "../core/AmortizationRow";

export class Csv {
  static toScheduleCsv(rows: AmortizationRow[]): string {
    const header = ["Ay","Taksit","Faiz","Anapara","KalanBakiye"];
    const lines = [header.join(",")];
    for (const r of rows) {
      lines.push([
        r.month,
        r.payment.toFixed(2),
        r.interest.toFixed(2),
        r.principal.toFixed(2),
        r.balance.toFixed(2)
      ].join(","));
    }
    return lines.join("\n");
  }

  static download(filename: string, content: string) {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }
}
