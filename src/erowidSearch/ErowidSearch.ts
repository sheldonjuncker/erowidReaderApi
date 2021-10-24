import ReportQuery from '../experienceReport/ReportQuery';
import fetch from 'node-fetch';
import ErowidListing from './ErowidListing';
import ErowidReport from './ErowidReport';

class ErowidSearch {
  protected query: ReportQuery;

  constructor(query: ReportQuery) {
    this.query = query;
  }

  async search(limit: number = 10, offset: number = 0): Promise<Array<ErowidReport>> {
    const queryParams = this.geParamsForQuery();
    const listing = this.makeSearchRequest(
      'https://erowid.org/experiences/exp.cgi?A=Search',
      queryParams
    );
    return [];
  }

  protected async makeSearchRequest(url: string, queryParams: any): Promise<ErowidListing> {
    const listing = new ErowidListing();
    const keys = Object.keys(queryParams);
    for (const key in keys) {
      url += '&' + key + '=' + queryParams[key];
    }
    const result = await fetch(url);
    console.log('result', result);
    return listing;
  }

  protected geParamsForQuery(): any {
    const queryParams = {};
    if (this.query.getActivity()) {
      queryParams['S4'] = this.query.getActivity();
    }
    if (this.query.getGender()) {
      queryParams['GenderSelect'] = this.query.getGender();
    }
    if (this.query.getLanguage()) {
      queryParams['Lang'] = this.query.getLanguage();
    }
    if (this.query.getIntensity()) {
      const intensity = this.query.getIntensity();
      queryParams['Intensity'] = intensity.getMin();
      queryParams['I2'] = intensity.getMax();
    }

    //Substances
    if (this.query.getSubstance() != undefined) {
      queryParams['S1'] = this.query.getSubstance();
    }
    if (this.query.getCombinationOne() != undefined) {
      queryParams['S2'] = this.query.getCombinationOne();
    }
    if (this.query.getCombinationTwo() != undefined) {
      queryParams['S3'] = this.query.getCombinationTwo();
    }

    if (this.query.getRoute()) {
      queryParams['DoseMethodID'] = this.query.getRoute();
    }

    return queryParams;
  }
}

export default ErowidSearch;
