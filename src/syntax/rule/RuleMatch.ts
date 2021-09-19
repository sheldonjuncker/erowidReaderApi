import SyntaxTreeBranch from '../SyntaxTreeBranch';
import RuleMatchOptions from './RuleMatchOptions';

class RuleMatch {
  public matched: boolean;
  public matchedBranches: Array<SyntaxTreeBranch>;
  public options: RuleMatchOptions;

  constructor(
    matched: boolean,
    matchedBranches: Array<SyntaxTreeBranch>,
    options: RuleMatchOptions = undefined
  ) {
    this.matched = matched;
    this.matchedBranches = matchedBranches;
    this.options = options || new RuleMatchOptions();
  }
}

export default RuleMatch;
