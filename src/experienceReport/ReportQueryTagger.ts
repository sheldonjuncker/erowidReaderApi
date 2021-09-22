import { Tag } from '../syntax/tag/Tag';
import SyntaxTree from '../syntax/SyntaxTree';
import RuleProcessor from '../syntax/rule/RuleProcessor';
import { substanceRules } from '../syntax/categoryRules/SubstanceRules';
import { genderRules } from '../syntax/categoryRules/GenderRules';
import { administrationRouteRules } from '../syntax/categoryRules/AdministrationRouteRules';
import { languageRules } from '../syntax/categoryRules/LanguageRules';
import { activityRules } from '../syntax/categoryRules/ActivityRules';
import { intensityRules } from '../syntax/categoryRules/IntensityRules';

class ReportQueryTagger {
  getTags(syntaxTree: SyntaxTree): Array<Tag> {
    const tags: Array<Tag> = syntaxTree.getTags();
    const ruleProcessor = new RuleProcessor(tags, syntaxTree);
    ruleProcessor.applyRules(substanceRules, true);
    ruleProcessor.applyRules(administrationRouteRules, true);
    ruleProcessor.applyRules(genderRules, true);
    ruleProcessor.applyRules(languageRules, true);
    ruleProcessor.applyRules(activityRules, true);
    ruleProcessor.applyRules(intensityRules, true);
    return ruleProcessor
      .getTags()
      .filter((tag: Tag) =>
        ['SUBSTANCE', 'GENDER', 'ROUTE', 'LIMIT', 'ACTIVITY', 'LANGUAGE', 'INTENSITY'].includes(
          tag.category
        )
      );
  }
}

export default ReportQueryTagger;
