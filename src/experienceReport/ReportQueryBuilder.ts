import ReportQuery from './ReportQuery';
import SyntaxParser from '../syntax/SyntaxParser';
import ReportQueryTagger from './ReportQueryTagger';
import { Tag } from '../syntax/tag/Tag';
import { substanceEnumMap } from './ReportSubstance';
import { ReportGender } from './ReportGender';
import { routeEnumMap } from './ReportAdministrationRoute';

class ReportQueryBuilder {
  async fromText(text: string): Promise<ReportQuery> {
    const syntaxParser = new SyntaxParser();
    const syntaxTree = await syntaxParser.parse(text);
    const tagger = new ReportQueryTagger();
    const tags = tagger.getTags(syntaxTree);
    console.log('tags', tags);
    return this.fromTags(tags);
  }

  fromTags(tags: Array<Tag>): ReportQuery {
    const reportQuery = new ReportQuery();

    //Substances
    this.addSubstancesToQuery(
      reportQuery,
      tags.filter((tag) => tag.category === 'SUBSTANCE')
    );

    //Route of administration
    const routeTag = tags.find((tag) => tag.category === 'ROUTE');
    if (routeTag) {
      if (routeEnumMap[routeTag.name]) {
        reportQuery.withRoute(routeEnumMap[routeTag.name]);
      }
    }

    //Gender
    const genderTag = tags.find((tag) => tag.category === 'GENDER');
    if (genderTag) {
      if (genderTag.name == 'male') {
        reportQuery.withGender(ReportGender.MALE);
      } else if (genderTag.name == 'female') {
        reportQuery.withGender(ReportGender.FEMALE);
      } else if (genderTag.name == 'non_binary') {
        reportQuery.withGender(ReportGender.NON_BINARY);
      } else if (genderTag.name == 'non_binary') {
        reportQuery.withGender(ReportGender.UNKNOWN);
      }
    }

    return reportQuery;
  }

  private addSubstancesToQuery(query: ReportQuery, substanceTags: Array<Tag>) {
    const substance = substanceTags.shift();
    if (substance && substanceEnumMap[substance.name]) {
      query.withSubstance(substanceEnumMap[substance.name]);
    }

    const combinationOne = substanceTags.shift();
    if (combinationOne && substanceEnumMap[combinationOne.name]) {
      query.withCombinationOne(substanceEnumMap[combinationOne.name]);
    }

    const combinationTwo = substanceTags.shift();
    if (combinationTwo && substanceEnumMap[combinationTwo.name]) {
      query.withCombinationTwo(substanceEnumMap[combinationTwo.name]);
    }
  }
}

export default ReportQueryBuilder;
