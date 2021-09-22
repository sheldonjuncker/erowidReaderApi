import RuleMap from '../rule/RuleMap';
import Rule from '../rule/Rule';
import WordRule from '../rule/WordRule';
import PhraseRule from '../rule/PhraseRule';
import WordListRule from '../rule/WordListRule';

//Mapping of themes to rules
const intensityRulesObject = {
  none: [
    new WordRule('effect').withModifier(new WordRule('no|without|unnoticeable')),
    new WordRule('effect').withModifier(
      new WordRule('noticeable|discernible|present|notice|experience').withNegation(true)
    ),
    new WordRule('threshold').withModifier(new WordRule('below|under')),
    new PhraseRule('plus minus'),
    new PhraseRule('plus or minus'),
  ],
  light: [
    new WordRule('trip|dose|report|experience|effect').withModifier(
      new WordRule('low|light|threshold|small|minor|tiny|minimal')
    ),
    new WordListRule([
      new WordRule('plus'),
      new WordRule('or|minus|two|three|four').withInverseMatch(true),
    ]),
    new PhraseRule('plus one'),
  ],
  medium: [
    new WordRule('trip|dose|report|experience|effect').withModifier(
      new WordRule('moderate|medium|mild|mid|average|middle|normal')
    ),
    new WordListRule([
      new WordRule('plus'),
      new WordRule('plus'),
      new WordRule('plus').withInverseMatch(true),
    ]),
    new PhraseRule('plus two'),
  ],
  strong: [
    new WordRule('trip|dose|report|experience|effect').withModifier(
      new WordRule('strong|heavy|high|serious|intense|stiff')
    ),
    new WordListRule([
      new WordRule('plus'),
      new WordRule('plus'),
      new WordRule('plus'),
      new WordRule('plus').withInverseMatch(true),
    ]),
    new PhraseRule('plus three'),
  ],
  extreme: [
    new WordRule('trip|dose|report|experience|effect').withModifier(
      new WordRule('extreme|insane|ridiculous|crazy|uber')
    ),
    new PhraseRule('tripping balls'),
    new PhraseRule('blasted'),
    new PhraseRule('loaded'),
    new PhraseRule('high as a kite'),
    new WordListRule([
      new WordRule('off'),
      new WordRule('of'),
      new WordRule('his|her|their'),
      new WordRule('tit'),
    ]),
    new WordListRule([new WordRule('off'), new WordRule('his|her|their'), new WordRule('tit')]),
    new WordRule('overdose'),
    new WordRule('OD'),
    new WordListRule([
      new WordRule('plus'),
      new WordRule('plus'),
      new WordRule('plus'),
      new WordRule('plus'),
    ]),
    new PhraseRule('plus four'),
  ],
};

const intensityRules = new RuleMap(
  'INTENSITY',
  new Map<string, Array<Rule>>(
    Object.keys(intensityRulesObject).map((k) => [k, intensityRulesObject[k]])
  )
);

export { intensityRules };
