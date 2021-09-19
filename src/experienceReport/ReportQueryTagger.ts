import { Tag } from '../syntax/tag/Tag';
import SyntaxTree from '../syntax/SyntaxTree';
import RuleProcessor from '../syntax/rule/RuleProcessor';
import { substanceRules } from '../syntax/categoryRules/SubstanceRules';
import { genderRules } from '../syntax/categoryRules/GenderRules';

class ReportQueryTagger {
  getTags(syntaxTree: SyntaxTree): Array<Tag> {
    const tags: Array<Tag> = syntaxTree.getTags();
    const ruleProcessor = new RuleProcessor(tags, syntaxTree);
    ruleProcessor.applyRules(substanceRules, false);
    ruleProcessor.applyRules(genderRules, false);
    return ruleProcessor.getTags().filter((tag: Tag) => tag.source == 'APP');
  }
}

export default ReportQueryTagger;
