import WordRule from './WordRule';
import WordListRule from './WordListRule';

/**
 * Generates word rules dealing with turning into something.
 * This might be for transforming into a child, animal, or magical person.
 * The class accepts the word rule for the thing being turned into and
 * returns an array of all of the rules for matching syntax for transforming into it.
 *
 * Example Rule: new WordRule('child')
 * Example Matches:
 * "I turned into a child."
 * "I became a child."
 * "I was a child."
 * "I am a child."
 * "We were children."
 * "I changed into a child."
 * "I transformed into a child."
 *
 *
 * @class TransformationRuleGenerator
 */
class TransformationRuleGenerator {
  protected rule: WordRule;

  constructor(rule: WordRule) {
    this.rule = rule;
  }

  /**
   * Generates the list of rules.
   *
   * @param onlyDreamer Specifies whether this applies only to the dreamer.
   * If set to true, this limits usages to "we/I" and not just anybody in the dream.
   * (todo: implement above...)
   */
  generate(onlyDreamer = false) {
    return [
      new WordListRule([new WordRule('be').withModifier(this.rule), new WordRule('a')]),
      new WordRule('be').withModifier(this.rule),
      new WordListRule([new WordRule('become').withModifier(this.rule), new WordRule('a')]),
      new WordListRule([
        new WordRule('see'),
        new WordRule('myself'),
        new WordRule('as').withModifier(this.rule),
      ]),
      new WordRule('turn|transform|change').withModifier(
        new WordRule('into').withModifier(this.rule)
      ),
    ];
  }
}

export default TransformationRuleGenerator;
