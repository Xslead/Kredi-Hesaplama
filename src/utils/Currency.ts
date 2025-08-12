export class Currency {
  private static fmt = new Intl.NumberFormat("tr-TR", {
    style: "currency", currency: "TRY", maximumFractionDigits: 2
  });
  static format(v: number): string { return Currency.fmt.format(v); }
}
