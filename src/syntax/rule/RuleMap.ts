import { TagCategory } from '../tag/TagCategory';
import Rule from './Rule';

class RuleMap {
  protected category: TagCategory;
  protected rules: Map<string, Array<Rule>>;
  constructor(category: TagCategory, rules: Map<string, Array<Rule>>) {
    this.category = category;
    this.rules = rules;
  }

  getRules(): Array<string> {
    return Array.from(this.rules.keys());
  }

  getRule(ruleName: string): Array<Rule> | null {
    return this.rules.get(ruleName) || null;
  }

  getCategory(): TagCategory {
    return this.category;
  }
}

export default RuleMap;
