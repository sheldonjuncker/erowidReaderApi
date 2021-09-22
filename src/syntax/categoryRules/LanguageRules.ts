import RuleMap from '../rule/RuleMap';
import Rule from '../rule/Rule';
import WordRule from '../rule/WordRule';
import PhraseRule from '../rule/PhraseRule';

//Mapping of themes to rules
const languageRulesObject = {
  english: [
    new WordRule('en'),
    new PhraseRule('en-us'),
    new PhraseRule('en-gb'),
    new WordRule('english'),
  ],
  german: [new WordRule('german'), new WordRule('deutsch'), new WordRule('de')],
  french: [new WordRule('fr'), new WordRule('french')],
  italian: [new WordRule('it'), new WordRule('italian')],
  spanish: [new WordRule('es'), new WordRule('spanish')],
  dutch: [new WordRule('dt'), new WordRule('dutch')],
};

const languageRules = new RuleMap(
  'LANGUAGE',
  new Map<string, Array<Rule>>(
    Object.keys(languageRulesObject).map((k) => [k, languageRulesObject[k]])
  )
);

export { languageRules };
