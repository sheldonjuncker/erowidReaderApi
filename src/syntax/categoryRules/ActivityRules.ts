import RuleMap from '../rule/RuleMap';
import Rule from '../rule/Rule';
import WordRule from '../rule/WordRule';
import PhraseRule from '../rule/PhraseRule';
import WordListRule from '../rule/WordListRule';

//Mapping of themes to rules
const activityRulesObject = {
  breathing: [new WordRule('breathe'), new WordRule('breathing'), new WordRule('breath')],
  chanting: [new WordRule('chant'), new WordRule('chanting')],
  dreams: [
    new WordRule('dream'),
    new WordRule('dreaming'),
    new WordRule('hypnagogia'),
    new WordRule('hypnagogic'),
    new WordRule('hypnopompia'),
    new WordRule('hypnopompic'),
  ],
  conferences: [new WordRule('conference'), new PhraseRule('meeting'), new PhraseRule('meet up')],
  endogenous: [new WordRule('endogenous'), new WordRule('endogenously')],
  families: [new WordRule('family')],
  fasting: [
    new WordRule('fasting'),
    new WordRule('fast').withPos(WordRule.POS_NOUN),
    new WordRule('fast').withPos(WordRule.POS_VERB),
  ],
  floatationTanks: [
    new PhraseRule('sensory deprivation'),
    new PhraseRule('sensory isolation'),
    new WordListRule([new WordRule('isolation|floatation'), new WordRule('tank')]),
  ],
  meditation: [new WordRule('meditate'), new WordRule('meditation')],
  music: [new WordRule('music'), new WordRule('song')],
  obe: [new PhraseRule('out of body'), new WordRule('obe'), new PhraseRule('astral projection')],
  policeAndCustoms: [
    new WordRule('police|policemen|policeman|policewoman|cop'),
    new PhraseRule('law enforcement'),
    new PhraseRule('customs'),
  ],
  ritual: [new WordRule('ritual'), new WordRule('ritually'), new WordRule('ritualistic')],
  sound: [new WordRule('sound')],
  sweat: [new WordRule('sweat'), new WordRule('sweating'), new WordRule('sweaty')],
  yoga: [new WordRule('yoga'), new WordRule('yogic')],
};

const activityRules = new RuleMap(
  'ACTIVITY',
  new Map<string, Array<Rule>>(
    Object.keys(activityRulesObject).map((k) => [k, activityRulesObject[k]])
  )
);

export { activityRules };
