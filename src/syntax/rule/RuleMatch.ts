import SyntaxTreeBranch from '../SyntaxTreeBranch';
import RuleMatchOptions from './RuleMatchOptions';

class RuleMatch {
  public matched: boolean;
  public matchedBranches: Array<SyntaxTreeBranch>;
  public options: RuleMatchOptions;
  public childMatches: Array<RuleMatch> = [];

  constructor(
    matched: boolean = false,
    matchedBranches: Array<SyntaxTreeBranch> = [],
    options: RuleMatchOptions = undefined
  ) {
    this.matched = matched;
    this.matchedBranches = matchedBranches;
    this.options = options || new RuleMatchOptions();
  }

  getMatchedWord(): string {
    if (this.options.overrideCallback) {
      return this.options.overrideCallback(this);
    } else {
      return this.matchedBranches.map((nerBranch) => nerBranch.lemma).join(' ');
    }
  }
}

export default RuleMatch;
