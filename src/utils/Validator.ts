export class Validator {
  static ensurePositiveNumber(v: number, name: string) {
    if (!(Number.isFinite(v) && v > 0)) {
      throw new Error(`${name} pozitif bir sayı olmalıdır.`);
    }
  }
  static ensurePositiveInt(v: number, name: string) {
    if (!(Number.isInteger(v) && v > 0)) {
      throw new Error(`${name} pozitif bir tam sayı olmalıdır.`);
    }
  }
  static ensureRate(v: number) {
    if (!(v >= 0)) throw new Error("Faiz oranı 0 veya daha büyük olmalıdır.");
  }
}
