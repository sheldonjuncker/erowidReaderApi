import WordRule from '../rule/WordRule';
import RuleMap from '../rule/RuleMap';
import Rule from '../rule/Rule';
import PhraseRule from '../rule/PhraseRule';
import { ReportSubstance } from '../../experienceReport/ReportSubstance';

//Mapping of themes to rules
const substanceRulesObject = {
  //Stimulants
  cocaine: ReportSubstance.COCAINE,
  coca: ReportSubstance.COCA,
  caffeine: ReportSubstance.CAFFEINE,
  methamphetamine: ReportSubstance.METHAMPHETAMINE,
  amphetamine: ReportSubstance.AMPHETAMINES,
  methadone: ReportSubstance.METHADONE,
  methaqualone: ReportSubstance.METHAQUALONE,
  kratom: ReportSubstance.KRATOM,
  nicotine: ReportSubstance.NICOTINE,
  tobacco: ReportSubstance.TOBACCO,

  //Depressants
  alcohol: ReportSubstance.ALCOHOL,
  benzos: ReportSubstance.BENZODIAZEPINES,
  heroin: ReportSubstance.HEROIN,
  opium: ReportSubstance.OPIUM,
  opiate: ReportSubstance.OPIATES,
  morphine: ReportSubstance.MORPHINE,

  //Hallucinogen
  dmt: [
    new WordRule('dmt'),
    new WordRule('nndmt'),
    new PhraseRule('nn dmt'),
    new WordRule('dimethyltryptamine'),
  ],
  lsd: [
    new WordRule('lsd'),
    new WordRule('lucy'),
    new WordRule('lsd25'),
    new PhraseRule('lsd 25'),
    new PhraseRule('lysergic acid'),
    new PhraseRule('lysergic acid diethylamide'),
  ],
  lsa: [new WordRule('lsa'), new PhraseRule('lysergic acid amide')],
  mescaline: [new WordRule('mescal|mescaline')],
  psilocin: [new WordRule('psilocin')],
  psilocybin: [new WordRule('psilocybin')],
  mushrooms: [
    new WordRule('mushroom'),
    new WordRule('psilocybe'),
    new WordRule('stropharia'),
    new WordRule('cubensis'),
    new PhraseRule('magic mushrooms'),
  ],
  ayahuasca: [
    new WordRule('aya'),
    new WordRule('ayahuasca'), //todo: s2t
  ],
  pharmahuasca: [
    new WordRule('pharmahuasca'), //todo: s2t
  ],
  salvia: [new WordRule('salvia')],
  salvinorin: [new WordRule('salvinorin')],
  mdma: [
    new WordRule('mdma'),
    new WordRule('ecstasy'),
    new WordRule('molly'),
    new WordRule('adam'),
    new WordRule('methylenedioxymethamphetamine'),
  ],
  _5meoDMT: [
    new PhraseRule('5 meo DMT'),
    new PhraseRule('5 methoxy DMT'),
    new PhraseRule('5 dimethyltryptamine'),
    new PhraseRule('5 methoxy dimethyltryptamine'),
  ],
  ketamine: [new WordRule('ketamine')],
  cannabis: [
    new WordRule('cannabis'),
    new WordRule('marijuana'),
    new WordRule('weed'),
    new WordRule('pot'),
  ],
  hashish: [new WordRule('hash'), new WordRule('hashish')],
  harmalas: [new WordRule('harmala'), new WordRule('harmalas')],
  harmaline: [new WordRule('harmaline')],
  harmine: [new WordRule('harmine')],
  tetrahydroharmine: [new WordRule('tetrahydroharmine')],
  syrianRue: [new PhraseRule('syrian rue')],
};

const substanceRules = new RuleMap(
  'SUBSTANCE',
  new Map<string, Array<Rule>>(
    Object.keys(substanceRulesObject).map((k) => [k, substanceRulesObject[k]])
  )
);

export { substanceRules };
