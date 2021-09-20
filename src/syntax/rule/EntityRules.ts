import WordRule from './WordRule';
import WordListRule from './WordListRule';
import RuleMatch from './RuleMatch';

const entityRules = {
  LIMIT: [
    new WordListRule([
      new WordRule(undefined).withRegExp(/[0-9]+/),
      new WordRule('result|report|experience|record'),
    ])
      .withDepth(1)
      .withMatchOverride((options: RuleMatch) => {
        if (options.matchedBranches.length > 0) {
          return options.matchedBranches[0].word;
        } else {
          return '(error)';
        }
      }),
  ],
};

export { entityRules };
