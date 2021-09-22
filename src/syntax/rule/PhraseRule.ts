import Rule from './Rule';
import SyntaxTree from '../SyntaxTree';
import RuleMatch from './RuleMatch';

class PhraseRule extends Rule {
  public phrase: string;
  private inverseMatch: boolean = false;

  constructor(phrase) {
    super();
    this.phrase = phrase;
  }

  /**
   * Inverts the results of a match so that you can match anything except what the word rule specifies.
   *
   * Note: You won't get any branches back from an inverse match as nothing actually matched.
   * @param inverseMatch
   */
  withInverseMatch(inverseMatch: boolean): PhraseRule {
    this.inverseMatch = inverseMatch;
    return this;
  }

  //todo: refactor so that we can return the matched branches
  match(syntaxTree: SyntaxTree): RuleMatch {
    const ruleMatch = new RuleMatch();
    const dreamText = syntaxTree.branches.map((branch) => branch.word.toLowerCase()).join(' ');
    ruleMatch.matched = dreamText.includes(this.phrase.toLowerCase());
    if (this.inverseMatch) {
      ruleMatch.matched = !ruleMatch.matched;
    }
    return ruleMatch;
  }

  /**
   * No need to clone as you can't modify this.
   */
  clone(): Rule {
    return this;
  }
}

export default PhraseRule;
