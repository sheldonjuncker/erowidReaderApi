import SyntaxTree from '../syntax/SyntaxTree';
import SyntaxTreeBranch from '../syntax/SyntaxTreeBranch';

/**
 * @class Rule
 *
 * Baseclass used by all rules which only need to implement the match()
 * method to check that a specific SyntaxTree is matched against.
 */
abstract class Rule {
  /**
   * Checks to see if the word rule is found in the syntax tree.
   * @param syntaxTree
   */
  abstract match(syntaxTree: SyntaxTree): Array<SyntaxTreeBranch>;

  /**
   * Makes a shallow copy of the rule.
   * This is required by all rules in order to easily clone them for reuse.
   */
  abstract clone(): Rule;
}

export default Rule;
