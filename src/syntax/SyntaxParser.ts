import { LanguageServiceClient } from '@google-cloud/language';
import SyntaxTree from './SyntaxTree';

class SyntaxParser {
  private static client: LanguageServiceClient;
  private getClient(): LanguageServiceClient {
    if (!SyntaxParser.client) {
      SyntaxParser.client = new LanguageServiceClient({
        credentials: {
          private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
        },
      });
    }
    return SyntaxParser.client;
  }

  async parse(text: string): Promise<SyntaxTree> {
    const client = this.getClient();
    const [syntax] = await client.analyzeSyntax({
      document: {
        content: text,
        type: 'PLAIN_TEXT',
      },
      encodingType: 'UTF8',
    });
    const [entities] = await client.analyzeEntities({
      document: {
        content: text,
        type: 'PLAIN_TEXT',
      },
      encodingType: 'UTF8',
    });
    return new SyntaxTree(syntax, entities.entities);
  }
}

export default SyntaxParser;
