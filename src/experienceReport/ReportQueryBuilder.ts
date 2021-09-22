import ReportQuery from './ReportQuery';
import SyntaxParser from '../syntax/SyntaxParser';
import ReportQueryTagger from './ReportQueryTagger';
import { Tag } from '../syntax/tag/Tag';
import { substanceEnumMap } from './ReportSubstance';
import { ReportGender } from './ReportGender';
import { routeEnumMap } from './ReportAdministrationRoute';
import { ReportLanguage } from './ReportLanguage';
import { activityEnumMap } from './ReportActivity';
import IntensityRange, { ReportIntensity } from './ReportIntensityRange';

class ReportQueryBuilder {
  async fromText(text: string): Promise<ReportQuery> {
    const syntaxParser = new SyntaxParser();
    const syntaxTree = await syntaxParser.parse(text);
    console.log('branches', syntaxTree.branches);
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
      console.log('route', routeTag);
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

    //Language
    const languageTag = tags.find((tag) => tag.category === 'LANGUAGE');
    if (languageTag) {
      if (languageTag.name == 'english') {
        reportQuery.withLanguage(ReportLanguage.ENGLISH);
      } else if (languageTag.name == 'german') {
        reportQuery.withLanguage(ReportLanguage.GERMAN);
      } else if (languageTag.name == 'italian') {
        reportQuery.withLanguage(ReportLanguage.ITALIAN);
      } else if (languageTag.name == 'french') {
        reportQuery.withLanguage(ReportLanguage.FRENCH);
      } else if (languageTag.name == 'spanish') {
        reportQuery.withLanguage(ReportLanguage.SPANISH);
      } else if (languageTag.name == 'dutch') {
        reportQuery.withLanguage(ReportLanguage.DUTCH);
      }
    }

    //Activity
    const activityTag = tags.find((tag) => tag.category === 'ACTIVITY');
    if (activityTag && activityEnumMap[activityTag.name]) {
      reportQuery.withActivity(activityEnumMap[activityTag.name]);
    }

    //Intensity
    const intensityTag = tags.find((tag) => tag.category === 'INTENSITY');
    if (intensityTag) {
      let intensity;
      if (intensityTag.name == 'none') {
        intensity = ReportIntensity.NO_EFFECT;
      } else if (intensityTag.name == 'light') {
        intensity = ReportIntensity.LIGHT;
      } else if (intensityTag.name == 'medium') {
        intensity = ReportIntensity.MEDIUM;
      } else if (intensityTag.name == 'strong') {
        intensity = ReportIntensity.STRONG;
      } else if (intensityTag.name == 'extreme') {
        intensity = ReportIntensity.EXTREME;
      }
      if (intensity) {
        const intensityRange = new IntensityRange(intensity, intensity);
        reportQuery.withIntensity(intensityRange);
      }
    }

    //Limit
    const limitTag = tags.find((tag) => tag.category === 'LIMIT');
    if (limitTag) {
      reportQuery.withLimit(parseInt(limitTag.name));
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
