enum ReportIntensity {
  NO_EFFECT = 1,
  LIGHT = 2,
  MEDIUM = 3,
  STRONG = 4,
  EXTREME = 5,
}

class IntensityRange {
  protected min: ReportIntensity;
  protected max: ReportIntensity;

  constructor(min: ReportIntensity, max: ReportIntensity) {
    this.min = min;
    this.max = max;
  }

  getMin(): ReportIntensity {
    return this.min;
  }

  setMin(min: ReportIntensity) {
    this.min = min;
  }

  getMax(): ReportIntensity {
    return this.max;
  }

  setMax(max: ReportIntensity) {
    this.max = max;
  }
}

export { ReportIntensity };
export default IntensityRange;
