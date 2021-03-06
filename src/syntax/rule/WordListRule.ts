import Rule from './Rule';
import SyntaxTree from '../SyntaxTree';
import RuleMatch from './RuleMatch';
import RuleMatchOptions from './RuleMatchOptions';
/**
 * Accepts a list of rules and applies them to the branches in sequence until
 * it finds a match.
 *
 * @class WordListRule
 */
class WordListRule extends Rule {
  public rules: Array<Rule> = [];
  protected depth: number = 0;
  protected matchOptions: RuleMatchOptions = new RuleMatchOptions();
  private inverseMatch: boolean;

  /**
   * Constructor.
   *
   * @param rules
   */
  constructor(rules: Array<Rule>) {
    super();
    this.rules = rules || [];
  }

  withMatchOverride(callback: (options: RuleMatch) => string): WordListRule {
    this.matchOptions.overrideCallback = callback;
    return this;
  }

  /**
   * Sets the maximum depth to match rules.
   * Set to 1 to not go past the first branch.
   *
   * @param depth
   */
  withDepth(depth: number): WordListRule {
    this.depth = depth;
    return this;
  }

  /**
   * Inverts the results of a match so that you can match anything except what the word rule specifies.
   *
   * Note: You won't get any branches back from an inverse match as nothing actually matched.
   * @param inverseMatch
   */
  withInverseMatch(inverseMatch: boolean): WordListRule {
    this.inverseMatch = inverseMatch;
    return this;
  }

  match(syntaxTree: SyntaxTree): RuleMatch {
    const ruleMatch = new RuleMatch(false, [], this.matchOptions);
    const depth = this.depth > 0 ? this.depth : syntaxTree.branches.length;
    //We need to find a sequence of tokens which match all rules
    for (let i = 0; i < depth; i++) {
      let branchesLeft = syntaxTree.branches.length - i;
      let branchIndex = i;
      const matchingBranches = [];
      //If we have more branches than rules, we might be able to match them all
      if (branchesLeft >= this.rules.length) {
        //Make sure each rule matches the corresponding branch
        for (let ruleIndex = 0; ruleIndex < this.rules.length; ruleIndex++, branchIndex++) {
          const branch = syntaxTree.branches[branchIndex];
          const rule = this.rules[ruleIndex];
          const bonsai = new SyntaxTree(null, null);
          bonsai.branches.push(branch);
          if (!rule.match(bonsai).matched) {
            break;
          } else {
            //Add to list or branches that have matched
            matchingBranches.push(branch);

            if (ruleIndex === this.rules.length - 1) {
              //We have matched every rule
              ruleMatch.matched = true;
              ruleMatch.matchedBranches = matchingBranches;
              break;
            }
          }
        }
      }
    }
    if (this.inverseMatch) {
      ruleMatch.matched = !ruleMatch.matched;
    }
    return ruleMatch;
  }

  /**
   * Not really going to clone this as you can't modify sub-rules.
   */
  clone(): Rule {
    return this;
  }
}

export default WordListRule;
