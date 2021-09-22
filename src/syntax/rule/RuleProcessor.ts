import { Tag } from '../tag/Tag';
import RuleMap from './RuleMap';
import SyntaxTree from '../SyntaxTree';
import { ObjectId } from 'bson';

class RuleProcessor {
  protected tags: Array<Tag>;
  protected syntaxTree: SyntaxTree;
  constructor(tags: Array<Tag>, syntaxTree: SyntaxTree) {
    this.tags = tags;
    this.syntaxTree = syntaxTree;
  }

  applyRules(ruleMap: RuleMap, removeMatched: boolean) {
    //You don't get to change these guys
    ruleMap.getRules().forEach((ruleName) => {
      const matchedTagIds = [];
      const ruleList = ruleMap.getRule(ruleName);
      let matched = false;
      let count = 0;
      ruleList.forEach((rule) => {
        const ruleMatch = rule.match(this.syntaxTree);
        if (ruleMatch.matched) {
          matched = true;
          //For each branch (word/tag) matched, go mark it with it's category
          ruleMatch.matchedBranches.forEach((branch) => {
            this.tags.forEach((tag: any) => {
              if (
                tag.lemma.toLowerCase() === branch.lemma.toLowerCase() &&
                !matchedTagIds.includes(tag.id)
              ) {
                matchedTagIds.push(tag.id);
                count += tag.count;
                if (removeMatched) {
                  //Remove the tags that matched (we are replacing with our new tag)
                  this.tags = this.tags.filter((filteredTag) => filteredTag.id !== tag.id);
                } else {
                  //Keep matched tags but sync their info
                  tag.category = ruleMap.getCategory();
                  tag.name = tag.name.toLowerCase();
                  tag.lemma = tag.lemma.toLowerCase();
                }
              }
            });
          });
        }
      });

      if (matched) {
        this.tags.push({
          id: new ObjectId().toHexString(),
          name: ruleName,
          lemma: ruleName,
          originalWord: null,
          category: ruleMap.getCategory(),
          source: 'APP',
          salience: null,
          metadata: null,
          sentiment: null,
          count,
        });
      }
    });
  }

  getTags(): Array<Tag> {
    return this.tags;
  }
}

export default RuleProcessor;
