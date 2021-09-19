import WordRule from './WordRule';
import WordListRule from './WordListRule';

const entityRules = {
  SUBSTANCE: [
    new WordListRule([new WordRule('dmt|nndmt|dimethyltryptamine|spice')])
      .withWordOverride('dmt')
      .withDepth(1),
  ],
};

export { entityRules };
