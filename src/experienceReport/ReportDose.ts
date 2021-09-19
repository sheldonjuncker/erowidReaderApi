class ReportDose {
  protected amount: number;
  protected units: string;

  constructor(amount: number, units: string) {
    this.amount = amount;
    this.units = units;
  }

  getAmount(): number {
    return this.amount;
  }

  setAmount(amount: number) {
    this.amount = amount;
  }

  getUnits(): string {
    return this.units;
  }

  setUnits(units: string) {
    this.units = units;
  }
}

export default ReportDose;
