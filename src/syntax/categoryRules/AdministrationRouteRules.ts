import RuleMap from '../rule/RuleMap';
import Rule from '../rule/Rule';
import WordRule from '../rule/WordRule';

//Mapping of themes to rules
const administrationRouteRulesObject = {
  oral: [
    new WordRule('eat'),
    new WordRule('ingest'),
    new WordRule('ingested'),
    new WordRule('ingestion'),
    new WordRule('oral'),
    new WordRule('orally'),
  ],
  insufflated: [
    new WordRule('snort'),
    new WordRule('snorted'),
    new WordRule('insufflate'),
    new WordRule('insufflated'),
    new WordRule('insufflation'),
  ],
  boofed: [
    new WordRule('boof'),
    new WordRule('boofed'),
    new WordRule('boofeding'),
    new WordRule('rectal'),
    new WordRule('rectally'),
    new WordRule('anus'),
    new WordRule('anal'),
    new WordRule('anally'),
    new WordRule('suppository'),
  ],
  im: [new WordRule('im'), new WordRule('muscle'), new WordRule('intramuscular')],
  iv: [
    new WordRule('iv'),
    new WordRule('vein'),
    new WordRule('inject'),
    new WordRule('venous'),
    new WordRule('intravenous'),
  ],
  smoked: [new WordRule('smoke'), new WordRule('smoked')],
  inhaled: [
    new WordRule('inhale'),
    new WordRule('inhaled'),
    new WordRule('breathe'),
    new WordRule('breathed'),
  ],
  subcutaneous: [
    new WordRule('subcutaneous'),
    new WordRule('cutaneous'),
    new WordRule('skin').withModifier(new WordRule('under|below|in|beneath')),
  ],
  sublingual: [
    new WordRule('sublingual'),
    new WordRule('tongue').withModifier(new WordRule('under|below|in|beneath')),
  ],
  transdermal: [
    new WordRule('transdermal'),
    new WordRule('dermal'),
    new WordRule('skin').withModifier(new WordRule('on|through')),
  ],
  buccal: [
    new WordRule('buccal'),
    new WordRule('cheek').withModifier(new WordRule('on|by|against|between')),
  ],
  vaginal: [new WordRule('vaginal'), new WordRule('vaginally'), new WordRule('vagina')],
  ocular: [
    new WordRule('ocular'),
    new WordRule('eye'),
    new WordRule('eyeball'),
    new WordRule('eyelid'),
  ],
  vaped: [new WordRule('vape'), new WordRule('vaped')],
  electrode: [
    new WordRule('electrode'),
    new WordRule('electric'),
    new WordRule('electricity'),
    new WordRule('electrically'),
  ],
};

const administrationRouteRules = new RuleMap(
  'ROUTE',
  new Map<string, Array<Rule>>(
    Object.keys(administrationRouteRulesObject).map((k) => [k, administrationRouteRulesObject[k]])
  )
);

export { administrationRouteRules };
