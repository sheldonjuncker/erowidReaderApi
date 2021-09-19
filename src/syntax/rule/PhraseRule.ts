import Rule from './Rule';
import SyntaxTree from '../SyntaxTree';
import SyntaxTreeBranch from '../SyntaxTreeBranch';
import RuleMatch from './RuleMatch';

class PhraseRule extends Rule {
  public phrase: string;

  constructor(phrase) {
    super();
    this.phrase = phrase;
  }

  //todo: refactor so that we can return the matched branches
  match(syntaxTree: SyntaxTree): RuleMatch {
    const dreamText = syntaxTree.branches.map((branch) => branch.word.toLowerCase()).join(' ');
    if (dreamText.includes(this.phrase.toLowerCase())) {
      return new RuleMatch(true, []);
    } else {
      return new RuleMatch(false, []);
    }
  }

  /**
   * No need to clone as you can't modify this.
   */
  clone(): Rule {
    return this;
  }
}

export default PhraseRule;
