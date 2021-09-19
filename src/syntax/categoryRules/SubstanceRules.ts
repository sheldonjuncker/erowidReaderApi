import WordRule from '../rule/WordRule';
import RuleMap from '../rule/RuleMap';
import Rule from '../rule/Rule';
import PhraseRule from '../rule/PhraseRule';

//Mapping of themes to rules
const substanceRulesObject = {
  dmt: [
    new WordRule('dmt'),
    new WordRule('nndmt'),
    new PhraseRule('nn dmt'),
    new WordRule('dimethyltryptamine'),
  ],
  lsd: [
    new WordRule('lsd'),
    new WordRule('lsd25'),
    new PhraseRule('lysergic acid'),
    new PhraseRule('lysergic acid amide'),
    new PhraseRule('lysergic acid diethylamide'),
  ],
  mushrooms: [
    new WordRule('mushroom'),
    new WordRule('psilocybe'),
    new WordRule('stropharia'),
    new WordRule('cubensis'),
    new WordRule('psilocybin'),
    new WordRule('psilocin'),
    new PhraseRule('magic mushrooms'),
  ],
};

const substanceRules = new RuleMap(
  'SUBSTANCE',
  new Map<string, Array<Rule>>(
    Object.keys(substanceRulesObject).map((k) => [k, substanceRulesObject[k]])
  )
);

export { substanceRules };
