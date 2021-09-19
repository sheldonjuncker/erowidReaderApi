class SyntaxTreeBranch {
  public word: string;
  public originalWord: string;
  public lemma: string;
  public pos: string;
  public entityType: string;
  public salience: number;
  public negation = false;
  public parent: SyntaxTreeBranch;
  public children: Array<SyntaxTreeBranch> = [];

  //Indicates the next number of tokens to skip (used for multi-part words which we consolidate)
  public consolidateNext: number;

  /**
   * Parses the Google API syntax info into an array of lemmas
   * where each lemma has it's part of speech and an array of modifiers.
   */
  constructor(
    word: string,
    originalWord: string,
    lemma: string,
    pos: string,
    entityType: string,
    salience: number,
    parent: SyntaxTreeBranch,
    children: Array<SyntaxTreeBranch>,
    consolidateNext: number
  ) {
    this.word = word;
    this.originalWord = originalWord;
    this.lemma = lemma;
    this.pos = pos;
    this.entityType = entityType;
    this.salience = salience;
    this.parent = parent;
    this.children = children || [];
    this.consolidateNext = consolidateNext || 0;
  }
}

export default SyntaxTreeBranch;
