import SyntaxTreeBranch from './SyntaxTreeBranch';
import WordRule from './rule/WordRule';
import nlp from 'compromise';
import { entityRules } from './rule/EntityRules';
import { Tag } from './tag/Tag';
import { ObjectId } from 'bson';
import { google } from '@google-cloud/language/build/protos/protos';

/**
 * @class SyntaxTree
 *
 * Represents a sentences syntax info for each word in order.
 * Contains the following info for each word:
 * 1. Lemma
 * 2. Part of Speech (PoS)
 * 3. Parent (Word that this is dependent upon)
 * 4. Parent PoS
 */
class SyntaxTree {
  public branches: Array<SyntaxTreeBranch> = [];

  public totalSalience = 0;
  public processedEntities = [];

  /**
   * Parses the Google API syntax info into an array of lemmas
   * where each lemma has it's part of speech and an array of modifiers.
   *
   * @param syntax
   * @param entities
   */
  constructor(
    syntax: google.cloud.language.v1.IAnalyzeSyntaxResponse,
    entities: google.cloud.language.v1.IEntity[]
  ) {
    //We might instantiate this directly at times for other purposes.
    if (syntax !== null && entities !== null) {
      const branches = [];
      let consolidatedBranches = [];

      syntax.tokens.forEach((part) => {
        branches.push(this.processPart(part, syntax, entities));
      });

      //Associate parents from dependency edges
      syntax.tokens.forEach((part, partIndex) => {
        if (part.dependencyEdge && Number.isInteger(part.dependencyEdge.headTokenIndex)) {
          const parentIndex = part.dependencyEdge.headTokenIndex;
          if (branches[parentIndex]) {
            const parentBranch = branches[parentIndex];
            const childBranch = branches[partIndex];

            //Set the child's parent
            childBranch.parent = parentBranch;

            //Add to the parent's children
            parentBranch.children.push(childBranch);
          }
        }
      });

      //Consolidate multi-part tags
      let consolidateNext = 0;
      let consolidationBranches = [];

      //First pass to catch all of the branches
      for (let i = 0; i < branches.length; i++) {
        const branch = branches[i];
        //console.log('Processing word: ', branch.originalWord);
        if (consolidateNext) {
          /*console.log(
            'Consolidating word with previous: ',
            consolidationBranches.map((branch) => branch.originalWord)
          );*/
          consolidateNext--;
          consolidationBranches.push(branch);

          //End of consolidation
          if (consolidateNext == 0) {
            //console.log('This is the last word to be consolidated.');
            //Use the end branch as it is the parent

            //Grab the full entity mention for the word (not really used)
            branch.word = consolidationBranches[0].word;

            //Combine the lemmas from each tag so that they are standardized
            branch.lemma = branch.word;
            branch.entityType = consolidationBranches[0].entityType;
            branch.salience = consolidationBranches.reduce(
              (total, branch) => total + branch.salience,
              0
            );

            //Remove any children that no longer exist
            branch.children = branch.children.filter(
              (child) => !consolidationBranches.includes(child)
            );
            consolidatedBranches.push(branch);
            consolidationBranches = [];
          }
          continue;
        }

        if (branch.consolidateNext) {
          //console.log('Word is part of a ' + (branch.consolidateNext + 1) + ' part set.');
          consolidateNext = branch.consolidateNext;
          consolidationBranches.push(branch);
        } else {
          consolidatedBranches.push(branch);
        }
      }

      //Filter out punctuation
      consolidatedBranches = consolidatedBranches.filter((branch) => {
        if (branch.pos === 'PUNCT' && branch.salience > 0) {
          console.log('wtf', branch);
        }
        return branch.pos !== 'PUNCT';
      });

      //Normalize some things in the text
      consolidatedBranches.forEach((branch) => {
        if (branch.word.toLowerCase() === "n't") {
          //wouldn't becomes "would" and "n't", we just want it to be "not"
          branch.word = 'not';
          branch.lemma = 'not';
        }
      });

      //Perform our NER as there are some things we want to consolidate that Google doesn't
      const nerTaggedBranches = [];
      while (consolidatedBranches.length) {
        const bonsai = new SyntaxTree(null, null);
        bonsai.branches = consolidatedBranches;

        const entities = Object.keys(entityRules);

        let foundEntity = false;
        for (let i = 0; i < entities.length && !foundEntity; i++) {
          const entity = entities[i];
          const rules = entityRules[entity];
          for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];
            const ruleMatch = rule.match(bonsai);
            //We have an NER tag
            if (ruleMatch.matched) {
              const nerWord = ruleMatch.getMatchedWord();
              const nerBranch = ruleMatch.matchedBranches[ruleMatch.matchedBranches.length - 1];
              //Combine the matched branches into a single tag
              nerBranch.word = nerWord;
              nerBranch.lemma = nerWord;

              nerBranch.entityType = entity;
              nerBranch.salience = ruleMatch.matchedBranches.reduce(
                (total, branch) => total + branch.salience,
                0
              );

              //Set children to the new parent and vice versa
              ruleMatch.matchedBranches.forEach((branch) => {
                if (branch == nerBranch) {
                  return;
                }

                branch.children.forEach((child) => {
                  child.parent = nerBranch;
                  nerBranch.children.push(child);
                });
              });

              //Add the combined branches
              nerTaggedBranches.push(nerBranch);
              foundEntity = true;
              while (ruleMatch.matchedBranches.pop()) {
                consolidatedBranches.shift();
              }
              break;
            }
          }
        }

        if (!foundEntity) {
          nerTaggedBranches.push(consolidatedBranches.shift());
        }
      }

      //Some words need to be marked as negations so they don't get tagged: "not afraid" ans such
      nerTaggedBranches.forEach((branch) => {
        if (
          //If we are an adjective and our verb is negated, we are also negated
          branch.pos == WordRule.POS_ADJECTIVE &&
          branch.parent.pos == WordRule.POS_VERB &&
          branch.parent.children.map((child) => child.lemma).includes('not')
        ) {
          branch.negation = true;
          branch.word = 'not ' + branch.word;
        }
      });

      this.branches = nerTaggedBranches;
    }
  }

  /**
   * Processes a single part of the sentence and adds it's dependencies.
   * This isn't highly efficient as we could do a single pass and then fill in
   * but it's simple and works as there isn't anything circular as far as I'm aware.
   *
   * @param part
   * @param syntax
   * @param entities
   */
  processPart(
    part: google.cloud.language.v1.IToken,
    syntax: google.cloud.language.v1.IAnalyzeSyntaxResponse,
    entities: google.cloud.language.v1.IEntity[]
  ): SyntaxTreeBranch {
    /*console.log('part', part);
    console.log('syntax', syntax);
    console.log('entities', entities);*/
    let word = part.text.content.split('\n')[0];
    console.log(word);
    const originalWord = word.split('\n')[0];
    const lemma = part.lemma.split('\n')[0];
    //console.log('Original Lemma', lemma);
    const pos = part.partOfSpeech.tag;
    let entityType = 'OTHER';
    let salience = 0;
    let consolidateNext = 0;

    const entityMentions = this.getEntityMentions(part, entities);
    //console.log('entities', entityMentions);

    if (entityMentions.length > 0) {
      //There can be more than one entity, but we only want the first one which has the salience
      const entity = entityMentions[0];
      if (!this.processedEntities.includes(entity.entityIndex)) {
        salience = entity.salience;
        this.totalSalience += salience;
        this.processedEntities.push(entity.entityIndex);
      }

      //Normalize the entity type
      switch (entity.type) {
        case 'LOCATION':
          entityType = 'SETTING';
          break;
        case 'PERSON':
          entityType = 'CHARACTER';
          break;
      }

      if (entity.mentions.length > 1) {
        console.log('ground control to major tom: m-' + entity.mentions.length);
      }

      const mention = entity.mentions[0];

      //Get the entity mention text
      word = mention.text.content.split('\n')[0];

      //Ignore individual parts of multi-word tags
      if (word.match(/[ -]/)) {
        const ignoreWords = word.split(/([- ])/).filter((word) => word !== ' ');
        //console.log('ignoreWords', ignoreWords);
        consolidateNext = ignoreWords.length - 1;
      }
    }

    //Change unknown verbs to activities
    if (pos === WordRule.POS_VERB) {
      entityType = 'ACTION';
      //Normalize the verb (should end in "ing")
      const gerund = nlp('I ' + lemma + ' the table.')
        .verbs()
        .toGerund()
        .verbs()
        .text();
      word = gerund || word;
    }

    const parent = undefined;
    const children = [];
    // @ts-ignore
    return new SyntaxTreeBranch(
      word,
      originalWord,
      lemma,
      <string>pos,
      entityType,
      salience,
      parent,
      children,
      consolidateNext
    );
  }

  private getEntityMentions(part, entities): Array<any> {
    return entities
      .map((entity, i) => ({
        ...entity,
        entityIndex: i,
        mentions: entity.mentions.filter(
          (mention) => mention.text.beginOffset === part.text.beginOffset
        ),
      }))
      .filter((entity) => entity.mentions.length > 0);
  }

  /**
   * Gets a list of normal tags.
   */
  getTags(): Array<Tag> {
    //Filter out prepositions and pronouns.
    let allTags = this.branches
      .filter((branch) => ![WordRule.POS_PRONOUN, WordRule.POS_PREPOSITION].includes(branch.pos))
      .map((branch) => {
        let name = branch.word;
        if (branch.pos == WordRule.POS_NOUN) {
          //If it's a noun, normalize on the lemma
          name = branch.lemma;
        }

        return {
          id: new ObjectId().toHexString(),
          name,
          lemma: branch.lemma,
          originalWord: branch.originalWord,
          source: 'GOOGLE',
          pos: branch.pos,
          category: branch.entityType,
          salience: branch.salience,
          metadata: null,
          sentiment: null,
          count: 1,
        };
      });
    const uniqueTags = [];
    while (allTags.length > 0) {
      //Get a tag
      const tag = allTags.shift();

      //Find all other matching tags
      const matchingTags = allTags.filter(
        (allTag) =>
          allTag.category === tag.category && allTag.lemma.toLowerCase() === tag.lemma.toLowerCase()
      );
      tag.count += matchingTags.length;
      tag.salience += matchingTags.reduce((total, tag) => total + tag.salience, 0);
      uniqueTags.push(tag);

      //Remove the matching tags
      allTags = allTags.filter(
        (allTag) =>
          !(
            allTag.category === tag.category &&
            allTag.lemma.toLowerCase() === tag.lemma.toLowerCase()
          )
      );
    }
    return uniqueTags;
  }
}

export default SyntaxTree;
