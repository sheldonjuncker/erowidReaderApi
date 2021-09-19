import WordRule from '../rule/WordRule';
import RuleMap from '../rule/RuleMap';
import Rule from '../rule/Rule';
import PhraseRule from '../rule/PhraseRule';
import WordListRule from '../rule/WordListRule';

//Mapping of themes to rules
const genderRulesObject = {
  male: [new WordRule('male'), new WordRule('man'), new WordRule('men'), new WordRule('boy')],
  female: [
    new WordRule('female'),
    new WordRule('woman'),
    new WordRule('women'),
    new WordRule('girl'),
  ],
  non_binary: [
    new WordRule('nonbinary'),
    new PhraseRule('non-binary'),
    new PhraseRule('non binary'),
    new WordRule('tran'),
    new WordRule('trans'),
    new WordRule('transgender'),
    new WordRule('transsexual'),
    new WordRule('transvestite'),
    new WordRule('transsexual'),
  ],
  other: [new WordListRule([new WordRule('unknown|unspecified|other'), new WordRule('gender')])],
};

const genderRules = new RuleMap(
  'GENDER',
  new Map<string, Array<Rule>>(Object.keys(genderRulesObject).map((k) => [k, genderRulesObject[k]]))
);

export { genderRules };
