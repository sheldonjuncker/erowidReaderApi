import Rule from './Rule';
import SyntaxTree from '../SyntaxTree';
import SyntaxTreeBranch from '../SyntaxTreeBranch';

class PhraseRule extends Rule {
  public phrase: string;

  constructor(phrase) {
    super();
    this.phrase = phrase;
  }

  //todo: refactor so that we can return the matched branches
  match(syntaxTree: SyntaxTree): Array<SyntaxTreeBranch> {
    const dreamText = syntaxTree.branches.map((branch) => branch.word.toLowerCase()).join(' ');
    if (dreamText.includes(this.phrase.toLowerCase())) {
      return [];
    } else {
      return null;
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
