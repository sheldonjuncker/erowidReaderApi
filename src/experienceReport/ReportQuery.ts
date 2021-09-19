import ReportDose from './ReportDose';
import { ReportGender } from './ReportGender';
import ReportIntensityRange from './ReportIntensityRange';
import { ReportLanguage } from './ReportLanguage';
import { ReportAdministrationRoute } from './ReportAdministrationRoute';
import { ReportSubstance } from './ReportSubstance';

class ReportQuery {
  protected title: string;
  protected body: string;
  protected author: string;
  protected gender: ReportGender = ReportGender.ANY;
  protected intensity: ReportIntensityRange;
  protected language: ReportLanguage = ReportLanguage.ENGLISH;
  protected substances: Array<ReportSubstance>;
  protected dose: ReportDose;
  protected route: ReportAdministrationRoute = ReportAdministrationRoute.ANY;
  protected activity: string;
  constructor() {}

  async parseFromText(text: string) {}

  getTitle(): string {
    return this.title;
  }
  withTitle(title: string): ReportQuery {
    this.title = title;
    return this;
  }

  getBody(): string {
    return this.body;
  }
  withBody(body: string): ReportQuery {
    this.body = body;
    return this;
  }

  getAuthor(): string {
    return this.author;
  }
  withAuthor(author: string): ReportQuery {
    this.author = author;
    return this;
  }

  getGender(): ReportGender {
    return this.gender;
  }
  withGender(gender: ReportGender): ReportQuery {
    this.gender = gender;
    return this;
  }

  getIntensity(): ReportIntensityRange {
    return this.intensity;
  }
  withIntensity(intensity: ReportIntensityRange): ReportQuery {
    this.intensity = intensity;
    return this;
  }

  getLanguage(): ReportLanguage {
    return this.language;
  }
  withLanguage(language: ReportLanguage): ReportQuery {
    this.language = language;
    return this;
  }

  getSubstances(): Array<string> {
    return this.substances;
  }
  withSubstance(substance: string): ReportQuery {
    if (!this.substances) {
      this.substances = [];
    }

    if (this.substances && this.substances.length == 3) {
      throw new Error('Erowid queries support at most 3 substances.');
    }
    this.substances.push(substance);
    return this;
  }

  getGender(): ReportGender {
    return this.gender;
  }
  withGender(gender: ReportGender): ReportQuery {
    this.gender = gender;
    return this;
  }
}

export default ReportQuery;
