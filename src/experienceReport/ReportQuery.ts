import ReportDose from './ReportDose';
import { ReportGender } from './ReportGender';
import ReportIntensityRange from './ReportIntensityRange';
import { ReportLanguage } from './ReportLanguage';
import { ReportAdministrationRoute } from './ReportAdministrationRoute';
import { ReportSubstance } from './ReportSubstance';
import { ReportActivity } from './ReportActivity';

class ReportQuery {
  protected title: string; //not going to implement
  protected body: string; //not going to implement
  protected author: string; //not going to implement
  protected gender: ReportGender = ReportGender.ANY; //check
  protected intensity: ReportIntensityRange; //check
  protected language: ReportLanguage = ReportLanguage.ENGLISH; //check
  protected substance: ReportSubstance = ReportSubstance.ANY; //check
  protected combinationOne: ReportSubstance; //check
  protected combinationTwo: ReportSubstance; //check
  protected dose: ReportDose; //not implemented by Erowid search
  protected route: ReportAdministrationRoute = ReportAdministrationRoute.ANY; //check
  protected activity: ReportActivity; //check
  protected limit: number = 10; //check

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

  getSubstance(): ReportSubstance {
    return this.substance;
  }
  withSubstance(substance: ReportSubstance): ReportQuery {
    this.substance = substance;
    return this;
  }

  getCombinationOne(): ReportSubstance {
    return this.combinationOne;
  }
  withCombinationOne(substance: ReportSubstance): ReportQuery {
    this.combinationOne = substance;
    return this;
  }

  getCombinationTwo(): ReportSubstance {
    return this.combinationTwo;
  }
  withCombinationTwo(substance: ReportSubstance): ReportQuery {
    this.combinationTwo = substance;
    return this;
  }

  getDose(): ReportDose {
    return this.dose;
  }
  withDose(dose: ReportDose): ReportQuery {
    this.dose = dose;
    return this;
  }

  getRoute(): ReportAdministrationRoute {
    return this.route;
  }
  withRoute(route: ReportAdministrationRoute): ReportQuery {
    this.route = route;
    return this;
  }

  getActivity(): ReportActivity {
    return this.activity;
  }
  withActivity(activity: ReportActivity): ReportQuery {
    this.activity = activity;
    return this;
  }

  getLimit(): number {
    return this.limit;
  }
  withLimit(limit: number) {
    this.limit = limit;
    return this;
  }
}

export default ReportQuery;
