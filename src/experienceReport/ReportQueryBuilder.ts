import ReportQuery from './ReportQuery';
import SyntaxParser from '../syntax/SyntaxParser';
import ReportQueryTagger from './ReportQueryTagger';
import { Tag } from '../syntax/tag/Tag';
import { ReportSubstance, substanceEnumMap } from './ReportSubstance';

class ReportQueryBuilder {
  async fromText(text: string): Promise<ReportQuery> {
    const syntaxParser = new SyntaxParser();
    const syntaxTree = await syntaxParser.parse(text);
    const tagger = new ReportQueryTagger();
    const tags = tagger.getTags(syntaxTree);
    return this.fromTags(tags);
  }

  fromTags(tags: Array<Tag>): ReportQuery {
    const reportQuery = new ReportQuery();
    this.addSubstancesToQuery(
      reportQuery,
      tags.filter((tag) => tag.category === 'SUBSTANCE')
    );
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
