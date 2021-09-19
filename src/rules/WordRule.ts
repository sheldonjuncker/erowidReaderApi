import Rule from './Rule';
import SyntaxTree from '../nlp/syntax/SyntaxTree';
import SyntaxTreeBranch from '../nlp/syntax/SyntaxTreeBranch';

/**
 * @class WordRule
 *
 * Represents a word or part of speech and is used to match/search against
 * words that have been parsed into a SyntaxTree.
 *
 * You can match a single word using a lemma:
 * 1. new WordRule('fly')
 * 2. new WordRule('cat')
 *
 * You can also match against a part of speech:
 * 1. new WordRule().withPos('VERB')
 * 2. new WordRule('fly').withPos('NOUN')
 *
 * You can finally check against modifiers (things that are dependent on this word)
 * 1. new WordRule('cat').withModifier('red')
 * 2. new WordRule('fly').withModifier('quick')
 *
 * These options can be combined in any way, and none are required.
 * For example:
 * new WordRule()
 * by itself would match any word.
 *
 * @todo
 * In the future, I'll be adding some fancy RegEx like features where you can match
 * one or more, or zero or more words using syntax like:
 * new WordRule('*')
 * new WordRule('+')
 * and after that, I want some system of "OR" or "AND" for modifiers and options.
 * new WordRule('fly')->withPos('NOUN')->orWithPos('VERB')
 * this needs some careful though though.
 * Must add an "|" operator for any word: new WordRule('test|quiz|assignment')
 * Add a "sentence contains" rule so that we don't have to check if things modify one another directly
 */
class WordRule extends Rule {
  //Basic PoS constants
  static POS_NOUN = 'NOUN';
  static POS_VERB = 'VERB';
  static POS_PREPOSITION = 'PREP';
  static POS_PRONOUN = 'PRON';
  static POS_ADJECTIVE = 'ADJ';
  static POS_ADVERB = 'ADV';

  //Do I need initializers for this?
  public word: string;
  public pos: string;
  public modifiers: Array<WordRule> = [];
  public entityType: string;
  public lemmatMatching = true;
  public negation = false;
  public regex: RegExp = null;

  /**
   * Sets the main word to check against.
   * Leave undefined if you don't care about what the word is.
   *
   * @param word
   */
  constructor(word) {
    super();
    this.word = word;
  }

  /**
   * Limits the rule to words of a specific part of speech.
   *
   * @param pos
   */
  withPos(pos): WordRule {
    this.pos = pos;
    return this;
  }

  /**
   * Limits to words which have a modifier as defined
   * by dependency edges in the Google API.
   *
   * @param modifier
   */
  withModifier(modifier: WordRule): WordRule {
    this.modifiers.push(modifier);
    return this;
  }

  /**
   * Limits to words with a specific entity type such as CHARACTER or OTHER.
   *
   * @param entityType
   */
  withEntity(entityType): WordRule {
    this.entityType = entityType;
    return this;
  }

  /**
   * Ensures we match a specific regex (for numbers)
   * @param regex
   */
  withRegExp(regex: RegExp): WordRule {
    this.regex = regex;
    return this;
  }

  /**
   * Specifies whether to use lemma matching or exact word matching.
   *
   * @param lemmaMatching
   */
  useLemma(lemmaMatching: boolean): WordRule {
    this.lemmatMatching = lemmaMatching;
    return this;
  }

  /**
   * If set to true, only matches against words which are being negated:
   * "not afraid" and such.
   *
   * @param negation
   */
  withNegation(negation: boolean): WordRule {
    this.negation = negation;
    return this;
  }

  /**
   * Check to see if the word is found in the syntax tree.
   *
   * @param syntaxTree
   */
  match(syntaxTree: SyntaxTree): Array<SyntaxTreeBranch> {
    const matches = [];
    for (let i = 0; i < syntaxTree.branches.length; i++) {
      const branch = syntaxTree.branches[i];
      if (this.word) {
        const myWords = this.word.toLowerCase().split('|');
        const dreamWord = (this.lemmatMatching ? branch.lemma : branch.word).toLowerCase();
        const dreamWordOriginal = (this.lemmatMatching
          ? branch.lemma
          : branch.originalWord
        ).toLowerCase();

        if (myWords.indexOf(dreamWord) === -1 && myWords.indexOf(dreamWordOriginal) === -1) {
          continue;
        }
      }

      if (this.pos && this.pos !== branch.pos) {
        continue;
      }

      if (this.entityType && this.entityType !== branch.entityType) {
        continue;
      }

      if (this.modifiers.length) {
        let foundModifiers = 0;
        this.modifiers.forEach((modifier) => {
          //Check each child branch for a lemma that matches
          branch.children.forEach((child) => {
            const bonsai = new SyntaxTree(null, null);
            bonsai.branches.push(child);
            if (modifier.match(bonsai)) {
              foundModifiers++;
            }
          });
        });

        if (foundModifiers !== this.modifiers.length) {
          continue;
        }
      }

      //Check for negation
      if (this.negation !== branch.negation) {
        continue;
      }

      //Check regex
      if (this.regex && this.word && !this.word.match(this.regex)) {
        continue;
      }

      //Add to matching branches
      matches.push(branch);
    }

    if (matches.length > 0) {
      return matches;
    } else {
      return null;
    }
  }

  clone(): WordRule {
    const wordRule = new WordRule(this.word);
    wordRule.withPos(this.pos);
    wordRule.withEntity(this.entityType);
    wordRule.useLemma(this.lemmatMatching);
    this.modifiers.forEach((modifier) => wordRule.withModifier(modifier));
    return wordRule;
  }
}

export default WordRule;
